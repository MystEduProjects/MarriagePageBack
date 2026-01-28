import Router from "koa-router";
import people from './routes/people.js';
import gifts from './routes/gifts.js';
import purchases from './routes/purchases.js';
import transaction from './routes/transaction.js';

const router = new Router();

// Endpoint de prueba para saber si la API responde
router.get('/', (ctx) => {
  ctx.body = { message: "Wedding API is alive", status: "ok" };
});

router.use('/people', people.routes());
router.use('/gifts', gifts.routes());
router.use('/purchases', purchases.routes());
router.use('/transaction', transaction.routes());

export default router;
