import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes.js';

dotenv.config();

const app = express();
const host = process.env.HOST;

// Conexión a DB optimizada
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(host);
    isConnected = db.connections[0].readyState;
    console.log(">>> MongoDB Conectado");
  } catch (err) {
    console.error(">>> Error Mongo:", err);
  }
};

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware para conectar a DB en cada request (Serverless friendly)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Rutas
app.use('/', router);

// IMPORTANTE PARA LOCAL:
// Solo levanta el puerto si no estás en Vercel
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Express en http://localhost:${PORT}`);
  });
}

export default app;
