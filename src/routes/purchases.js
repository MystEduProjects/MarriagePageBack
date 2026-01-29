import { Router } from 'express';
import Purchase from '../models/purchase.js';

const router = Router();

// GET all purchases
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.find({});
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create purchase
router.post('/', async (req, res) => {
  try {
    // En Express usamos req.body directamente
    const purchase = new Purchase(req.body);
    const newPurchase = await purchase.save();
    
    if (newPurchase) {
      res.status(201).json(newPurchase);
    } else {
      // Es mejor enviar un objeto JSON incluso en errores
      res.status(400).json({ message: 'Purchase not created' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;