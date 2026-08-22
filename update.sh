#!/usr/bin/env bash
set -Eeuo pipefail

INSTALL_DIR="${AUTOCARE_INSTALL_DIR:-/opt/autocare}"
BRANCH="${AUTOCARE_BRANCH:-main}"

[[ ${EUID} -eq 0 ]] || { echo "Ejecute como root o con sudo." >&2; exit 1; }
[[ -d "${INSTALL_DIR}/.git" ]] || { echo "No se encuentra la instalación AutoCare." >&2; exit 1; }

cd "${INSTALL_DIR}"

echo "[AutoCare] Creando backup previo..."
./backup.sh

echo "[AutoCare] Actualizando repositorio..."
git fetch origin "${BRANCH}"
git checkout "${BRANCH}"
git pull --ff-only origin "${BRANCH}"

# shellcheck disable=SC1091
set -a; source .env; set +a

if [[ -n "${CLOUDFLARE_TUNNEL_TOKEN:-}" ]]; then
  docker compose --profile tunnel up -d --build --remove-orphans
else
  docker compose up -d --build --remove-orphans
fi

docker image prune -f >/dev/null 2>&1 || true
echo "[AutoCare] Actualización completada."
