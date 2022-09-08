import * as z from 'zod';
import { WithId } from 'mongodb';

import { Item } from '../items/items.model';
import { db } from '../../db';

export const Order = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  items: z.array(Item),
  timestamp: z.date(),
});

export type Order = z.infer<typeof Order>;
export type OrderWithId = WithId<Order>;
export const Orders = db.collection<Order>('orders');