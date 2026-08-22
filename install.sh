#!/usr/bin/env bash
set -Eeuo pipefail

REPO_URL="${AUTOCARE_REPO_URL:-https://github.com/atreyu1968/autocare.git}"
BRANCH="${AUTOCARE_BRANCH:-main}"
INSTALL_DIR="${AUTOCARE_INSTALL_DIR:-/opt/autocare}"
HTTP_PORT="${AUTOCARE_HTTP_PORT:-8080}"
BIND_ADDRESS="${AUTOCARE_BIND_ADDRESS:-0.0.0.0}"
ADMIN_EMAIL="${AUTOCARE_ADMIN_EMAIL:-admin@autocare.local}"
ADMIN_PASSWORD="${AUTOCARE_ADMIN_PASSWORD:-}"
DOMAIN="${AUTOCARE_DOMAIN:-}"
TUNNEL_TOKEN="${CLOUDFLARE_TUNNEL_TOKEN:-}"
RECONFIGURE="${AUTOCARE_RECONFIGURE:-0}"

log() { printf '\n\033[1;34m[AutoCare]\033[0m %s\n' "$*"; }
fail() { printf '\n\033[1;31m[AutoCare ERROR]\033[0m %s\n' "$*" >&2; exit 1; }
randhex() { openssl rand -hex "$1"; }
randpass() { openssl rand -base64 24 | tr -d '/+=' | cut -c1-24; }

if [[ ${EUID} -ne 0 ]]; then
  fail "Ejecute el instalador como root o mediante sudo."
fi

if [[ ! -r /etc/os-release ]]; then
  fail "No se puede detectar el sistema operativo."
fi
# shellcheck disable=SC1091
source /etc/os-release
case "${ID:-}" in
  debian|ubuntu) ;;
  *) fail "Sistema no soportado en esta versión: ${ID:-desconocido}. Use Debian o Ubuntu." ;;
esac

export DEBIAN_FRONTEND=noninteractive
log "Instalando dependencias básicas"
apt-get update -y
apt-get install -y ca-certificates curl git openssl

if ! command -v docker >/dev/null 2>&1; then
  log "Docker no está instalado; instalando Docker Engine"
  curl -fsSL https://get.docker.com -o /tmp/autocare-get-docker.sh
  sh /tmp/autocare-get-docker.sh
  rm -f /tmp/autocare-get-docker.sh
fi

systemctl enable --now docker >/dev/null 2>&1 || true

docker compose version >/dev/null 2>&1 || fail "Docker Compose v2 no está disponible."

if [[ -d "${INSTALL_DIR}/.git" ]]; then
  log "Repositorio existente detectado; actualizando ${BRANCH}"
  git -C "${INSTALL_DIR}" fetch origin "${BRANCH}"
  git -C "${INSTALL_DIR}" checkout "${BRANCH}"
  git -C "${INSTALL_DIR}" pull --ff-only origin "${BRANCH}"
elif [[ -e "${INSTALL_DIR}" ]]; then
  fail "${INSTALL_DIR} existe pero no contiene el repositorio AutoCare."
else
  log "Clonando AutoCare en ${INSTALL_DIR}"
  git clone --branch "${BRANCH}" --depth 1 "${REPO_URL}" "${INSTALL_DIR}"
fi

cd "${INSTALL_DIR}"
FIRST_INSTALL=0

if [[ ! -f .env || "${RECONFIGURE}" == "1" ]]; then
  FIRST_INSTALL=1
  POSTGRES_PASSWORD="$(randhex 24)"
  JWT_SECRET="$(randhex 48)"
  if [[ -z "${ADMIN_PASSWORD}" ]]; then
    ADMIN_PASSWORD="$(randpass)"
  fi

  cat > .env <<EOF
POSTGRES_USER=autocare
POSTGRES_DB=autocare
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
DATABASE_URL=postgresql://autocare:${POSTGRES_PASSWORD}@postgres:5432/autocare?schema=public
REDIS_URL=redis://redis:6379
JWT_SECRET=${JWT_SECRET}
AUTOCARE_ADMIN_EMAIL=${ADMIN_EMAIL}
AUTOCARE_ADMIN_PASSWORD=${ADMIN_PASSWORD}
AUTOCARE_HTTP_PORT=${HTTP_PORT}
AUTOCARE_BIND_ADDRESS=${BIND_ADDRESS}
AUTOCARE_DOMAIN=${DOMAIN}
CLOUDFLARE_TUNNEL_TOKEN=${TUNNEL_TOKEN}
NODE_ENV=production
EOF
  chmod 600 .env
else
  log "Se conserva la configuración existente de ${INSTALL_DIR}/.env"
  # shellcheck disable=SC1091
  set -a; source .env; set +a
  HTTP_PORT="${AUTOCARE_HTTP_PORT:-${HTTP_PORT}}"
  BIND_ADDRESS="${AUTOCARE_BIND_ADDRESS:-${BIND_ADDRESS}}"
  DOMAIN="${AUTOCARE_DOMAIN:-${DOMAIN}}"
  TUNNEL_TOKEN="${CLOUDFLARE_TUNNEL_TOKEN:-${TUNNEL_TOKEN}}"
fi

log "Construyendo y arrancando AutoCare"
if [[ -n "${TUNNEL_TOKEN}" ]]; then
  docker compose --profile tunnel up -d --build --remove-orphans
else
  docker compose up -d --build --remove-orphans
fi

log "Esperando a que la aplicación responda"
READY=0
for _ in $(seq 1 90); do
  if curl -fsS "http://127.0.0.1:${HTTP_PORT}/healthz" >/dev/null 2>&1; then
    READY=1
    break
  fi
  sleep 2
done

if [[ "${READY}" != "1" ]]; then
  docker compose ps || true
  fail "AutoCare no respondió a tiempo. Revise: cd ${INSTALL_DIR} && docker compose logs"
fi

LOCAL_IP="$(hostname -I 2>/dev/null | awk '{print $1}')"
[[ -n "${LOCAL_IP}" ]] || LOCAL_IP="127.0.0.1"

printf '\n============================================================\n'
printf ' AutoCare instalado correctamente\n'
printf '============================================================\n'
printf ' Acceso local: http://%s:%s\n' "${LOCAL_IP}" "${HTTP_PORT}"
if [[ -n "${DOMAIN}" ]]; then
  printf ' Acceso previsto por Cloudflare: https://%s\n' "${DOMAIN}"
fi
printf ' Directorio: %s\n' "${INSTALL_DIR}"
printf ' Administrador: %s\n' "${AUTOCARE_ADMIN_EMAIL:-${ADMIN_EMAIL}}"
if [[ "${FIRST_INSTALL}" == "1" ]]; then
  printf ' Contraseña inicial: %s\n' "${ADMIN_PASSWORD}"
  printf ' IMPORTANTE: guarde la contraseña y cámbiela al iniciar sesión.\n'
fi
if [[ -n "${TUNNEL_TOKEN}" ]]; then
  printf ' Cloudflare Tunnel: activado\n'
  printf ' En Cloudflare, el hostname público debe apuntar a http://nginx:80\n'
else
  printf ' Cloudflare Tunnel: no configurado\n'
fi
printf '============================================================\n\n'
