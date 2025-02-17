import { z } from 'zod';
import { Page } from '../schema';

// ✅ Signup Request Schema (Zod)
export const GetMyPagesRequestDto = z.any();

// ✅ TypeScript Type Inference
export type GetMyPagesRequestDto = z.infer<typeof GetMyPagesRequestDto>;

// ✅ Signup Response Schema (Zod)
export const GetMyPagesResponseDto = z.lazy(() =>
  Page.array().nullable().optional(),
);

// ✅ TypeScript Type for Response
export type GetMyPagesResponseDto = z.infer<typeof GetMyPagesResponseDto>;
