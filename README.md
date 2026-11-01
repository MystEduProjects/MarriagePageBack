# Local Setup

Using 
- yarn v1.22.22
- Node v22.12.0
- MongoDB (running on docker for local environment)

```bash
yarn install
yarn dev
```

## Deployment

The Vercel deployment exposes `src/index.js` as the Node function and routes
all API paths through it. The people deletion endpoint is:

```text
DELETE /people/:id
```
