import { Router, Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

// IMPORT INTERFACES & MODELS
import { OrderWithId, Order, Orders } from './order.model';

const router = Router();

// GET ALL
router.get('/', async (req: Request, res: Response<OrderWithId[]>, next: NextFunction) => {
  try {
    const orders = await Orders.find().toArray();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET ONE
router.get('/:id', async (req: Request<{ id: string }, OrderWithId, {}>, res: Response<OrderWithId>, next: NextFunction) => {
  try {
    const result = await Orders.findOne({ _id: new ObjectId(req.params.id) });
    if (!result) {
      res.status(404);
      throw new Error(`Item with id: ${req.params.id} does not exist...`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// CREATE ONE
router.post('/', async (req: Request<{}, OrderWithId, Order>, res: Response, next: NextFunction) => {
  try {
    const validateResult = await Order.parseAsync(req.body);
    await Orders.insertOne(validateResult);
    res.json(`Added new item: ${req.body.name}`);
  } catch (error) {
    next(error);
  }
});

// UPDATE ONE
router.put('/:id', async (req: Request<{ id: string }, OrderWithId, Order>, res: Response, next: NextFunction) => {
  try {
    const result = await Orders.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' },
    );

    if (!result) {
      res.status(404);
      throw new Error(`Item with id: ${req.params.id} does not exist...`);
    }

    res.json(`Update item with id: ${req.params.id}`);
  } catch (error) {
    next(error);
  }
});

// DELETE ONE
router.delete('/:id', async (req: Request<{ id: string }, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const result = await Orders.findOneAndDelete({ _id: new ObjectId(req.params.id) });

    if (!result) {
      res.status(404);
      throw new Error(`Item with id: ${req.params.id} does not exist...`);
    }

    res.json(`Delete item with id: ${req.params.id}`);
  } catch (error) {
    next(error);
  }
});
export default router;