import { Router, Response, Request } from 'express';
import { ItemWithId, Items } from './items.model';

const router = Router();

// GET ALL
router.get('/', async (req: Request, res: Response<ItemWithId[]>) => {
  const result = await Items.find();
  const items = await result.toArray();
  res.json(items);
});

export default router;
