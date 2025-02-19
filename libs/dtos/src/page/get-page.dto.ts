import { z } from 'zod';
import { Page } from '../schema';

// ✅ Signup Request Schema (Zod)
export const GetPageRequestBodyDto = z.any();

// ✅ TypeScript Type Inference
export type GetPageRequestBodyDto = z.infer<typeof GetPageRequestBodyDto>;

// ✅ Signup Request Schema (Zod)
export const GetPageRequestParamDto = z.object({
  pageId: z.string().trim().optional(),
});

// ✅ TypeScript Type Inference
export type GetPageRequestParamDto = z.infer<typeof GetPageRequestParamDto>;

// ✅ Signup Response Schema (Zod)
export const GetPageResponseDto = z.lazy(() => Page.nullable().optional());

// ✅ TypeScript Type for Response
export type GetPageResponseDto = z.infer<typeof GetPageResponseDto>;
