import { Router, Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

// IMPORT INTERFACES & MODELS
import { ItemWithId, Item, Items } from './items.model';

const router = Router();

// GET ALL
router.get('/', async (req: Request, res: Response<ItemWithId[]>, next: NextFunction) => {
  try {
    const items = await Items.find().toArray();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// GET ONE
router.get('/:id', async (req: Request<{ id: string }, ItemWithId, {}>, res: Response<ItemWithId>, next: NextFunction) => {
  try {
    const result = await Items.findOne({ _id: new ObjectId(req.params.id) });
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
router.post('/', async (req: Request<{}, ItemWithId, Item>, res: Response, next: NextFunction) => {
  try {
    const validateResult = await Item.parseAsync(req.body);
    await Items.insertOne(validateResult);
    res.json(`Added new item: ${req.body.name}`);
  } catch (error) {
    next(error);
  }
});

// UPDATE ONE
router.put('/:id', async (req: Request<{ id: string }, ItemWithId, Item>, res: Response, next: NextFunction) => {
  try {
    const result = await Items.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) }, 
      { $set: req.body }, 
      { returnDocument: 'after' },
    );

    if (!result.value) {
      res.status(404);
      throw new Error(`item with id: ${req.params.id} does not exist`);
    }

    res.json(`Updated item with id: ${req.params.id}`);
  } catch (error) {
    next(error);
  }
});

// DELETE ONE
router.delete('/:id', async (req: Request<{ id: string }, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const result = await Items.findOneAndDelete({ _id: new ObjectId(req.params.id) });

    if (!result.value) {
      res.status(404);
      throw new Error(`item with id: ${req.params.id} does not exist`);
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
