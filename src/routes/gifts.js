import Router from 'koa-router';
import Gift from '../models/gift.js';

const router = new Router();


router.get('gifts.all', '/', async (ctx) => {
  const gifts = await Gift.find({});
  ctx.body = gifts;
  ctx.status = 200;
})

router.post('gift.create', '/', async (ctx) => {
  try {
    const body = ctx.request.body;
    const gift = new Gift(body);
    const newGift = await gift.save();
    if (newGift) {
      ctx.body = newGift;
      ctx.status = 201;
    }
    else {
      ctx.body = 'Not created:', newGift;
      ctx.status = 400;
    }
  }
  catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
})

export default router;
