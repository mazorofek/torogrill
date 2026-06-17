# Toro Grill AWS Deployment

This guide deploys the whole app on one AWS Linux server with Docker Compose:

- `web`: nginx serving the built React/Vite frontend
- `api`: Node/Express backend for `/api/contact`, `/api/events`, and `/api/healthz`

## Recommended AWS Setup

Use one of these:

- EC2 `t3.micro` for the lowest cost.
- EC2 `t3.small` if you want smoother Docker builds on the server.
- Lightsail 1GB or 2GB if you prefer a simpler AWS dashboard.

For EC2, choose:

- OS: Ubuntu 22.04 LTS or 24.04 LTS
- Architecture: x86_64 / amd64
- Security Group inbound rules:
  - SSH: TCP 22 from your IP
  - HTTP: TCP 80 from anywhere
  - HTTPS: TCP 443 from anywhere, if you add SSL later

## 1. Install Docker on the Server

SSH into the server, then run:

```bash
sudo apt update
sudo apt install -y ca-certificates curl git
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"
```

Log out and SSH back in so the Docker group change takes effect.

## 2. Add Swap on Small Instances

Recommended for `t3.micro`:

```bash
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## 3. Clone the Project

```bash
git clone <your-github-repo-url> torogrill
cd torogrill
```

## 4. Create the Backend Environment File

Create `artifacts/api-server/.env` on the server:

```bash
nano artifacts/api-server/.env
```

Use this template:

```env
PORT=5001
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your_business_email
RESEND_FROM_EMAIL=Toro Grill <your_verified_sender@example.com>
DATABASE_URL=your_supabase_postgres_connection_string
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
ADMIN_EMAILS=manager@example.com
```

Do not commit this file to Git.

## 5. Build and Start the App

Create `artifacts/toro-grill/.env` before building so the static admin login has Supabase config:

```env
PORT=5173
BASE_PATH=/
API_ORIGIN=http://api:5001
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Pass that file to Docker Compose when building so `VITE_*` reaches the frontend build args:

```bash
docker compose --env-file artifacts/toro-grill/.env -f docker-compose.aws.yml up -d --build
```

Check status:

```bash
docker compose -f docker-compose.aws.yml ps
docker compose -f docker-compose.aws.yml logs -f
```

## 6. Verify

From the server:

```bash
curl http://localhost/api/healthz
```

Expected response:

```json
{"status":"ok"}
```

From your browser:

```text
http://<server-public-ip>
```

Submit the contact form and event form, then confirm the email arrives. Open `/admin/login`, sign in with a Supabase user listed in `ADMIN_EMAILS`, and confirm `/admin/leads` loads.

## 7. Connect a Domain

In your DNS provider, create:

- Type: `A`
- Name: `@`
- Value: `<server-public-ip>`

Optional:

- Type: `CNAME`
- Name: `www`
- Value: your root domain

For HTTPS, the simplest path is to use Cloudflare DNS proxy in front of the server. A stricter production setup can add Certbot or a reverse proxy such as Caddy.

## Updating the Deployment

On the server:

```bash
cd torogrill
git pull
docker compose --env-file artifacts/toro-grill/.env -f docker-compose.aws.yml up -d --build
```

## Notes

- The admin dashboard needs Supabase/Postgres via `DATABASE_URL`.
- The API is internal to Docker; only nginx is exposed publicly on port 80.
- Keep `artifacts/api-server/.env` only on the server.
- If Docker builds fail on a `t3.micro`, use `t3.small` or build images outside the server.
