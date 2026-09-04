import type { z } from 'zod';

import { createCardSchema } from './schema';

export type CreateCardFormValues = z.infer<
    typeof createCardSchema
>;