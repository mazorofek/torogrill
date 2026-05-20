# Toro Grill Deployment

This project deploys the frontend to Vercel and the Express API to Render.

## 1. Deploy the Backend on Render

1. Go to Render Dashboard.
2. Create a new Web Service from this GitHub repository.
3. Keep Root Directory empty so Render builds from the repository root.
4. Use these settings:
   - Runtime: Node
   - Build Command: `corepack enable && pnpm install --frozen-lockfile && pnpm run build:api`
   - Start Command: `pnpm --filter @workspace/api-server run start`
   - Health Check Path: `/api/healthz`
5. Add these environment variables:
   - `NODE_ENV=production`
   - `RESEND_API_KEY=<your Resend API key>`
   - `CONTACT_TO_EMAIL=<where form emails should arrive>`
   - `RESEND_FROM_EMAIL=<verified Resend sender>`
6. Deploy the service.
7. Copy the Render URL, for example `https://torogrill-api.onrender.com`.

## 2. Connect Vercel to Render

Open `vercel.json` and replace this placeholder:

```json
"destination": "https://YOUR_RENDER_SERVICE.onrender.com/api/:path*"
```

With your real Render API URL:

```json
"destination": "https://torogrill-api.onrender.com/api/:path*"
```

Commit and push the change.

## 3. Configure Vercel

In the existing Vercel project settings:

- Root Directory: repository root
- Framework Preset: Vite or Other
- Install Command: `corepack enable && pnpm install --frozen-lockfile`
- Build Command: `pnpm run build:web`
- Output Directory: `artifacts/toro-grill/dist/public`

No frontend environment variables are required for production because Vercel proxies `/api/*` to Render.

## 4. Verify Production

Backend:

```bash
curl https://<render-url>/api/healthz
```

Expected response:

```json
{"status":"ok"}
```

Frontend:

1. Open the Vercel URL.
2. Submit the contact form.
3. Submit the event form.
4. Confirm the requests go to `/api/contact` and `/api/events` on the Vercel domain.
5. Confirm the business email receives both messages.

## Local Build Checks

```bash
pnpm run build:api
pnpm run build:web
```

