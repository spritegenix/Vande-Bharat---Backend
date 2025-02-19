import { z } from 'zod';

// ✅ Signup Request Schema (Zod)
export const CreateFollowingRequestBodyDto = z.any();

// ✅ TypeScript Type Inference
export type CreateFollowingRequestBodyDto = z.infer<
  typeof CreateFollowingRequestBodyDto
>;

// ✅ Signup Request Schema (Zod)
export const CreateFollowingRequestParamDto = z.object({
  pageId: z
    .string()
    .trim() // First trim to clean the string
    .min(1, 'Page ID is required'), // Ensure it's not empty

  followingId: z.string().trim().min(1, 'Page Follower ID is required'),
});

// ✅ TypeScript Type Inference
export type CreateFollowingRequestParamDto = z.infer<
  typeof CreateFollowingRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const CreateFollowingResponseDto = z
  .object({
    pageHistory: z.any(),
  })
  .omit({ pageHistory: true })
  .passthrough();

// ✅ TypeScript Type for Response
export type CreateFollowingResponseDto = z.infer<
  typeof CreateFollowingResponseDto
>;
