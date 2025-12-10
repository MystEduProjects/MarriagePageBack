import Router from "koa-router";
import people from './routes/people.js';

const router = new Router();

router.use('/people', people.routes());

export default router;
