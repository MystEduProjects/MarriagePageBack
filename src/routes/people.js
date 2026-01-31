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

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Sacamos el ID de la URL
    const updateData = req.body; // Los datos que vienen del front (attend, menu, etc.)

    // { new: true } sirve para que nos devuelva el objeto ya actualizado
    const updatedPerson = await Person.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPerson) {
      return res.status(404).json({ error: "Persona no encontrada" });
    }

    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
