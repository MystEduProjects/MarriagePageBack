import Router from 'koa-router';
import { tx } from '../utils/trx.cjs';
import { v4 as uuidv4 } from 'uuid';

const router = new Router();

/**** FORMATO

{
  total: total a pagar
}

*****/
router.post('/', async (ctx) => {
  try {
    const total = ctx.request.body.total;
    const buyOrder = uuidv4().replace(/-/g, '').slice(0, 26);
    const trx = await tx.create(buyOrder, 'marriage-commerce', total, process.env.FRONT_URL);
    ctx.status = 200;
    ctx.body = {
      url: trx.url,
      token: trx.token
    }
  }
  catch (error) {
    ctx.body = error;
    ctx.status = 500;
    console.log(error)
  }
})

export default router;
