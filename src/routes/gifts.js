import { Router } from 'express';
import Gift from '../models/gift.js';

const router = new Router();


router.get('/', async (req, res) => {
  try {
    const gifts = await Gift.find({});
    res.status(200).json(gifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all labels
router.get('/labels', async (req, res) => {
  try {
    // Obtiene todos los strings únicos dentro de los arreglos "labels"
    const labels = await Gift.distinct('labels');
    res.status(200).json(labels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create gift
router.post('/', async (req, res) => {
  try {
    const gift = new Gift(req.body);
    const newGift = await gift.save();
    
    if (newGift) {
      res.status(201).json(newGift);
    } else {
      res.status(400).json({ message: 'Not created' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Sacamos el ID de la URL
    const updateData = req.body; // Los datos que vienen del front

    // { new: true } sirve para que nos devuelva el objeto ya actualizado
    const updatedGift = await Gift.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedGift) {
      return res.status(404).json({ error: "Regalo no encontrado" });
    }

    res.status(200).json(updatedGift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
