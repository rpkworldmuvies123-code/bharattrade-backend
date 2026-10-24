# BharatTrade API

Node.js + Express backend for the BharatTrade starter.

1. Copy `.env.example` to `.env` and configure `JWT_SECRET`, `MONGODB_URI`, and `FRONTEND_URL`.
2. Run `npm install` then `npm run dev`.
3. Check `GET /api/health`.

Market quotes are demo values until a provider adapter is implemented in `src/services/marketData.js`. Live order execution is deliberately disabled.
