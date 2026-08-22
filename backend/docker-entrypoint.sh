#!/bin/sh
set -eu

echo "[AutoCare API] Aplicando migraciones..."
npx prisma migrate deploy

echo "[AutoCare API] Cargando datos base..."
npx tsx prisma/seed.ts

echo "[AutoCare API] Iniciando API..."
exec node dist/server.js
