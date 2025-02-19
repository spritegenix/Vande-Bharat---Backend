import { z } from 'zod';

// ✅ Signup Request Schema (Zod)
export const DeleteFollowerRequestBodyDto = z.any();

// ✅ TypeScript Type Inference
export type DeleteFollowerRequestBodyDto = z.infer<
  typeof DeleteFollowerRequestBodyDto
>;

// ✅ Signup Request Schema (Zod)
export const DeleteFollowerRequestParamDto = z.object({
  pageId: z
    .string()
    .trim() // First trim to clean the string
    .min(1, 'Page ID is required'), // Ensure it's not empty

  followerId: z.string().trim().min(1, 'Page Follower ID is required'),
});

// ✅ TypeScript Type Inference
export type DeleteFollowerRequestParamDto = z.infer<
  typeof DeleteFollowerRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const DeleteFollowerResponseDto = z.object({
  message: z.string().nullable().optional(),
});

// ✅ TypeScript Type for Response
export type DeleteFollowerResponseDto = z.infer<
  typeof DeleteFollowerResponseDto
>;
