import Router from 'koa-router';
import Person from '../models/person.js';

const router = new Router();


router.get('people.all', '/', async (ctx) => {
  const people = await Person.find({});
  ctx.body = people;
})

router.post('person.create', '/', async (ctx) => {
  try {
    const body = ctx.request.body;
    const person = new Person(body);
    const newPerson = await person.save();
    if (newPerson) {
      ctx.body = newPerson;
      ctx.status = 201;
    }
    else {
      ctx.body = 'Not created:', newPerson;
      ctx.status = 400;
    }
  }
  catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
})

export default router;
