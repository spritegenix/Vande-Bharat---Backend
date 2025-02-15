import { z } from 'zod';
import { Page } from '../schema';

// ✅ Signup Request Schema (Zod)
export const MyPagesRequestDto = z.any();

// ✅ TypeScript Type Inference
export type MyPagesRequestDto = z.infer<typeof MyPagesRequestDto>;

// ✅ Signup Response Schema (Zod)
export const MyPagesResponseDto = z.lazy(() =>
  Page.array().nullable().optional(),
);

// ✅ TypeScript Type for Response
export type MyPagesResponseDto = z.infer<typeof MyPagesResponseDto>;
