import Router from "koa-router";
import people from './routes/people.js';
import gifts from './routes/gifts.js';
import purchases from './routes/purchases.js';

const router = new Router();

router.use('/people', people.routes());
router.use('/gifts', gifts.routes());
router.use('/purchases', purchases.routes());

export default router;
