# AutoCare 🚗

AutoCare es una plataforma web autoalojada para la gestión del mantenimiento preventivo y predictivo basado en reglas de un vehículo.

El objetivo del proyecto es disponer de un asistente técnico que permita controlar:

- Revisiones periódicas por kilómetros y tiempo.
- Historial completo de mantenimiento.
- Checklists de intervención.
- Alertas de mantenimiento próximo o vencido.
- Diagnóstico técnico del vehículo.
- Costes acumulados de mantenimiento.

## Vehículos incluidos inicialmente

La primera versión incorpora plantillas técnicas para:

- Nissan Qashqai J10 — Motor MR20DE 2.0 gasolina.
- Nissan Qashqai J10 — Motor M9R 2.0 dCi diésel.

La arquitectura está preparada para añadir nuevas marcas, modelos y motorizaciones sin modificar la aplicación.

---

# Instalación automática

AutoCare está diseñado para instalarse como una aplicación autoalojada mediante Docker.

La instalación completa se realiza con un único comando:

```bash
curl -fsSL https://raw.githubusercontent.com/atreyu1968/autocare/main/install.sh | sudo bash
```

El instalador realiza automáticamente:

1. Comprobación del sistema.
2. Instalación de Docker si es necesario.
3. Descarga del proyecto.
4. Creación de la configuración inicial.
5. Generación de claves seguras.
6. Creación de la base de datos.
7. Aplicación de migraciones.
8. Carga de datos iniciales Nissan.
9. Inicio de todos los servicios.

---

# Instalación desatendida con Cloudflare Tunnel

AutoCare puede publicarse de forma segura mediante Cloudflare Tunnel sin abrir puertos en el router.

Ejemplo:

```bash
curl -fsSL https://raw.githubusercontent.com/atreyu1968/autocare/main/install.sh | sudo env \\
  AUTOCARE_ADMIN_EMAIL='admin@ejemplo.com' \\
  AUTOCARE_DOMAIN='autocare.ejemplo.com' \\
  CLOUDFLARE_TUNNEL_TOKEN='token-del-tunel' \\
  bash
```

La aplicación quedará accesible mediante:

```text
https://autocare.ejemplo.com
```

La configuración del túnel en Cloudflare debe apuntar al servicio interno:

```text
http://nginx:80
```

---

# Acceso local

Por defecto:

```text
http://IP_DEL_SERVIDOR:8080
```

El puerto puede modificarse mediante:

```text
AUTOCARE_HTTP_PORT
```

---

# Arquitectura técnica

AutoCare utiliza una arquitectura basada en contenedores:

```text
AutoCare
│
├── Frontend Next.js
│
├── Backend Node.js + Express
│
├── PostgreSQL
│
├── Redis
│
├── Nginx Reverse Proxy
│
└── Cloudflare Tunnel (opcional)
```

---

# Servicios principales

- Frontend: Next.js + React + TypeScript.
- API: Node.js + Express.
- ORM: Prisma.
- Base de datos: PostgreSQL.
- Caché y tareas: Redis.
- Proxy inverso: Nginx.
- Acceso remoto seguro: Cloudflare Tunnel.

---

# Scripts de administración

Después de la instalación:

```bash
/opt/autocare/update.sh
```

Actualiza la aplicación manteniendo los datos.

```bash
/opt/autocare/backup.sh
```

Realiza copias de seguridad de la base de datos y configuración.

```bash
/opt/autocare/uninstall.sh
```

Desinstala la aplicación de forma controlada.

---

# Requisitos recomendados

Sistemas compatibles:

- Debian 11.
- Debian 12.
- Ubuntu 22.04.
- Ubuntu 24.04.

Recomendado:

- 2 GB de RAM mínimo.
- 4 GB de RAM recomendado.
- Docker Engine.
- Docker Compose v2.

---

# Estado del proyecto

AutoCare se encuentra en desarrollo activo.

La estrategia de desarrollo prioriza:

1. Infraestructura reproducible.
2. Instalación sencilla.
3. Base técnica sólida.
4. Catálogo de vehículos escalable.
5. Motor de mantenimiento fiable.

---

# Licencia

Proyecto en desarrollo. La información de mantenimiento incorporada debe utilizarse como ayuda de gestión y no sustituye los manuales oficiales del fabricante ni la intervención de profesionales cualificados.
