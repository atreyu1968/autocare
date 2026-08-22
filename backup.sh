#!/usr/bin/env bash
set -Eeuo pipefail

INSTALL_DIR="${AUTOCARE_INSTALL_DIR:-/opt/autocare}"
BACKUP_DIR="${AUTOCARE_BACKUP_DIR:-/var/backups/autocare}"

[[ ${EUID} -eq 0 ]] || { echo "Ejecute como root o con sudo." >&2; exit 1; }
[[ -f "${INSTALL_DIR}/.env" ]] || { echo "No se encuentra ${INSTALL_DIR}/.env" >&2; exit 1; }

cd "${INSTALL_DIR}"
# shellcheck disable=SC1091
set -a; source .env; set +a

mkdir -p "${BACKUP_DIR}"
chmod 700 "${BACKUP_DIR}"
STAMP="$(date +%Y%m%d-%H%M%S)"
DB_FILE="${BACKUP_DIR}/autocare-db-${STAMP}.sql.gz"
ENV_FILE="${BACKUP_DIR}/autocare-env-${STAMP}.tar.gz"

echo "[AutoCare] Copiando PostgreSQL..."
docker compose exec -T postgres pg_dump -U "${POSTGRES_USER}" "${POSTGRES_DB}" | gzip -9 > "${DB_FILE}"

echo "[AutoCare] Copiando configuración..."
tar -czf "${ENV_FILE}" .env docker-compose.yml nginx
chmod 600 "${DB_FILE}" "${ENV_FILE}"

echo "[AutoCare] Backup completado: ${DB_FILE}"
