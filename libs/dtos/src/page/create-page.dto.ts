import { z } from 'zod';
import { Page } from '../schema';

// ✅ Signup Request Schema (Zod)
export const CreatePageRequestBodyDto = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  pageContactDetails: z
    .any()
    .transform((val) => {
      try {
        return val
          ? JSON.parse(typeof val === 'string' ? val : JSON.stringify(val))
          : undefined;
      } catch {
        return undefined; // or throw new Error("Invalid JSON input");
      }
    })
    .optional(),
});

// ✅ TypeScript Type Inference
export type CreatePageRequestBodyDto = z.infer<typeof CreatePageRequestBodyDto>;

// ✅ Signup Response Schema (Zod)
export const CreatePageResponseDto = z.lazy(() =>
  Page.extend({
    message: z.string().nullable().optional(),
  })
    .nullable()
    .optional(),
);

// ✅ TypeScript Type for Response
export type CreatePageResponseDto = z.infer<typeof CreatePageResponseDto>;
