import { Router } from 'express';
import Person from '../models/person.js';

const router = new Router();


router.get('/', async (req, res) => {
  try {
    const people = await Person.find({});
    res.status(200).json(people); // En Express es .json() o .send()
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newPerson = new Person(req.body); // req.body directo gracias a express.json()
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
