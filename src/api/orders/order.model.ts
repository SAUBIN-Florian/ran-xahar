import * as z from 'zod';

import { Item } from '../items/items.model';

const Order = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  phone: z.string(),
  items: z.array(Item).min(1),
  timestamp: z.date(),
});

type Order = z.infer<typeof Order>;

export default Order;