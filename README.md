# AutoCare

AutoCare is a self-hosted web platform for preventive and rule-based predictive vehicle maintenance.

Initial vehicle templates:
- Nissan Qashqai J10 — MR20DE 2.0 petrol
- Nissan Qashqai J10 — M9R 2.0 dCi diesel

The production stack is Docker Compose based and supports optional remote access through Cloudflare Tunnel without opening inbound router ports.

## One-command installation

```bash
curl -fsSL https://raw.githubusercontent.com/atreyu1968/autocare/main/install.sh | sudo bash
```

For a fully unattended install, variables can be supplied before the command:

```bash
curl -fsSL https://raw.githubusercontent.com/atreyu1968/autocare/main/install.sh | sudo env \
  AUTOCARE_ADMIN_EMAIL='admin@example.com' \
  AUTOCARE_DOMAIN='autocare.example.com' \
  CLOUDFLARE_TUNNEL_TOKEN='your-token' \
  bash
```

If no administrator password is supplied, the installer generates one and prints it once at the end of installation.

## Local access

By default AutoCare is exposed on:

```text
http://SERVER_IP:8080
```

The local port can be changed with `AUTOCARE_HTTP_PORT`.

## Cloudflare Tunnel

When `CLOUDFLARE_TUNNEL_TOKEN` is configured, the installer starts the `cloudflared` service. Configure the public hostname in Cloudflare Zero Trust so that the tunnel service points to:

```text
http://nginx:80
```

## Main services

- Next.js frontend
- Node.js / Express API
- PostgreSQL
- Redis
- Nginx reverse proxy
- Optional Cloudflare Tunnel

## Administration scripts

```bash
/opt/autocare/update.sh
/opt/autocare/backup.sh
/opt/autocare/uninstall.sh
```

## Status

The repository is under active construction. The deployment foundation is being created first so the application remains reproducible from the start.
