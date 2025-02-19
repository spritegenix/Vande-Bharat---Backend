import { z } from 'zod';

// ✅ Signup Request Schema (Zod)
export const UpdateFollowingRequestBodyDto = z.any();

// ✅ TypeScript Type Inference
export type UpdateFollowingRequestBodyDto = z.infer<
  typeof UpdateFollowingRequestBodyDto
>;

// ✅ Signup Request Schema (Zod)
export const UpdateFollowingRequestParamDto = z.object({
  pageId: z
    .string()
    .trim() // First trim to clean the string
    .min(1, 'Page ID is required'), // Ensure it's not empty

  followingId: z.string().trim().min(1, 'Page Follower ID is required'),
});

// ✅ TypeScript Type Inference
export type UpdateFollowingRequestParamDto = z.infer<
  typeof UpdateFollowingRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const UpdateFollowingResponseDto = z
  .object({
    pageHistory: z.any(),
  })
  .omit({ pageHistory: true })
  .passthrough();

// ✅ TypeScript Type for Response
export type UpdateFollowingResponseDto = z.infer<
  typeof UpdateFollowingResponseDto
>;
