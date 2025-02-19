import { z } from 'zod';
import { Page } from '../schema';

// ✅ Signup Request Schema (Zod)
export const DeletePageRequestBodyDto = z.any();

// ✅ TypeScript Type Inference
export type DeletePageRequestBodyDto = z.infer<typeof DeletePageRequestBodyDto>;

// ✅ Signup Request Schema (Zod)
export const DeletePageRequestParamDto = z.object({
  pageId: z.string().trim().min(1, 'Page Follower ID is required'),
});

// ✅ TypeScript Type Inference
export type DeletePageRequestParamDto = z.infer<
  typeof DeletePageRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const DeletePageResponseDto = z.lazy(() =>
  Page.extend({
    message: z.string().nullable().optional(),
  })
    .nullable()
    .optional(),
);

// ✅ TypeScript Type for Response
export type DeletePageResponseDto = z.infer<typeof DeletePageResponseDto>;
