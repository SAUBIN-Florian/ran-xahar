import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import items from './items/items.route';
import orders from './orders/order.route';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/items', items);
router.use('/orders', orders);

export default router;
