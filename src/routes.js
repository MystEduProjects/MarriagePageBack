import { Router } from 'express';
import peopleRoutes from './routes/people.js';
import giftsRoutes from './routes/gifts.js';
import purchasesRoutes from './routes/purchases.js';
import transactionRoutes from './routes/transaction.js';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: "Wedding API (Express) is alive" });
});

router.use('/people', peopleRoutes);
router.use('/gifts', giftsRoutes);
router.use('/purchases', purchasesRoutes);
router.use('/transaction', transactionRoutes);

export default router;
