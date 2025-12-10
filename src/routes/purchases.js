import Router from 'koa-router';
import Purchase from '../models/purchase.js';

const router = new Router();


router.get('purchases.all', '/', async (ctx) => {
  const purchases = await Purchase.find({});
  ctx.body = purchases;
  ctx.status = 200;
})

router.post('purchase.create', '/', async (ctx) => {
  try {
    const body = ctx.request.body;
    const purchase = new Purchase(body);
    const newPurchase = await purchase.save();
    if (newPurchase) {
      ctx.body = newPurchase;
      ctx.status = 201;
    }
    else {
      ctx.body = 'Not created:', newPurchase;
      ctx.status = 400;
    }
  }
  catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
})

export default router;
