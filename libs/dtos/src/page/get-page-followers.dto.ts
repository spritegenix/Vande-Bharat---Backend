import { z } from 'zod';
import { PageFollower } from '../schema';

// ✅ Signup Request Schema (Zod)
export const GetPageFollowerRequestBodyDto = z.object({});

// ✅ TypeScript Type Inference
export type GetPageFollowerRequestBodyDto = z.infer<
  typeof GetPageFollowerRequestBodyDto
>;

// ✅ Signup Request Schema (Zod)
export const GetPageFollowerRequestParamDto = z.object({
  pageId: z
    .string()
    .trim() // First trim to clean the string
    .min(1, 'Page ID is required') // Ensure it's not empty
    .refine((val) => /^[a-f0-9-]+$/.test(val), {
      message: 'Invalid Page ID format',
    }) // Validate format
    .transform((val) => val.toLowerCase()), // Apply transformation to lowercase
});

// ✅ TypeScript Type Inference
export type GetPageFollowerRequestParamDto = z.infer<
  typeof GetPageFollowerRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const GetPageFollowerResponseDto = z.lazy(() =>
  PageFollower.array().nullable().optional(),
);

// ✅ TypeScript Type for Response
export type GetPageFollowerResponseDto = z.infer<
  typeof GetPageFollowerResponseDto
>;
