#!/usr/bin/env bash
set -Eeuo pipefail

INSTALL_DIR="${AUTOCARE_INSTALL_DIR:-/opt/autocare}"
PURGE="${AUTOCARE_PURGE:-0}"

[[ ${EUID} -eq 0 ]] || { echo "Ejecute como root o con sudo." >&2; exit 1; }
[[ -f "${INSTALL_DIR}/docker-compose.yml" ]] || { echo "No se encuentra AutoCare en ${INSTALL_DIR}." >&2; exit 1; }

cd "${INSTALL_DIR}"

if [[ "${PURGE}" == "1" ]]; then
  echo "[AutoCare] Creando backup antes del borrado total..."
  ./backup.sh
  docker compose --profile tunnel down -v --remove-orphans || docker compose down -v --remove-orphans
  cd /
  rm -rf "${INSTALL_DIR}"
  echo "[AutoCare] AutoCare y sus volúmenes han sido eliminados. El backup se conserva en /var/backups/autocare."
else
  docker compose --profile tunnel down --remove-orphans || docker compose down --remove-orphans
  echo "[AutoCare] Servicios detenidos. Datos y configuración conservados."
  echo "Para borrar todo: sudo AUTOCARE_PURGE=1 ${INSTALL_DIR}/uninstall.sh"
fi
