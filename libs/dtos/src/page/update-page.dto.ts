import { z } from 'zod';
import { Page } from '../schema';

// ✅ Signup Request Schema (Zod)
export const UpdatePageRequestBodyDto = z.object({
  name: z.string().optional(),
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
export type UpdatePageRequestBodyDto = z.infer<typeof UpdatePageRequestBodyDto>;

// ✅ Signup Request Schema (Zod)
export const UpdatePageRequestParamDto = z.object({
  pageId: z.string().min(1, 'Page ID is required'),
});

// ✅ TypeScript Type Inference
export type UpdatePageRequestParamDto = z.infer<
  typeof UpdatePageRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const UpdatePageResponseDto = z.lazy(() =>
  Page.extend({
    message: z.string().nullable().optional(),
  })
    .nullable()
    .optional(),
);

// ✅ TypeScript Type for Response
export type UpdatePageResponseDto = z.infer<typeof UpdatePageResponseDto>;
