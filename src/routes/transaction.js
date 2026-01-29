import { Router } from 'express';
import { tx } from '../utils/trx.cjs';
import { v4 as uuidv4 } from 'uuid';

const router = new Router();

/**** FORMATO

{
  total: total a pagar
}

*****/
router.post('/', async (req, res) => {
  try {
    const { total } = req.body; // Extraemos el total directamente
    
    // Generar Orden de Compra única (máx 26 caracteres para Transbank)
    const buyOrder = uuidv4().replace(/-/g, '').slice(0, 26);
    const sessionId = 'marriage-session-' + uuidv4().slice(0, 8);

    // Creamos la transacción en Transbank
    // Nota: El SDK de Transbank suele pedir (buyOrder, sessionId, amount, returnUrl)
    const trx = await tx.create(
      buyOrder, 
      sessionId, 
      total, 
      process.env.FRONT_URL
    );

    // En Express, enviamos status y json de esta forma
    res.status(200).json({
      url: trx.url,
      token: trx.token
    });
  }
  catch (error) {
    console.error("Error en Transbank Create:", error);
    res.status(500).json({
      error: 'No se pudo crear la transacción',
      details: error.message
    });
  }
});

export default router;
