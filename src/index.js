import koa from 'koa';
import KoaLogger from "koa-logger";
import { koaBody } from "koa-body";
import router from './routes.js';
import dotenv from 'dotenv';
import cors from '@koa/cors';
import serverless from 'serverless-http';
import mongoose from 'mongoose';

dotenv.config();

const app = new koa();

const host = process.env.HOST;
let isConnected = false;

async function connectToDB() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(host);
    isConnected = db.connections[0].readyState;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to DB:', err);
  }
}

app.use(cors({
  origin: '*'
}));

app.use(KoaLogger());
app.use(koaBody());

// Middleware para asegurar conexión a DB en cada request
app.use(async (ctx, next) => {
  await connectToDB();
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

// Exportar para Vercel
const handler = serverless(app);

export default async (req, res) => {
  return await handler(req, res);
};
