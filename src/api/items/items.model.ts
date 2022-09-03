import * as z from 'zod';
import { WithId } from 'mongodb';
import { db } from '../../db';

export const Item = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
});

type Item = z.infer<typeof Item>;

export type ItemWithId = WithId<Item>;
export const Items = db.collection<Item>('items');