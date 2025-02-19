import { any, z } from 'zod';
import { PageFollower } from '../schema';

// ✅ Signup Request Schema (Zod)
export const DeleteFollowingRequestBodyDto = any();

// ✅ TypeScript Type Inference
export type DeleteFollowingRequestBodyDto = z.infer<
  typeof DeleteFollowingRequestBodyDto
>;

// ✅ Signup Request Schema (Zod)
export const DeleteFollowingRequestParamDto = z.object({
  pageId: z
    .string()
    .trim() // First trim to clean the string
    .min(1, 'Page ID is required'), // Ensure it's not empty

  followingId: z.string().trim().min(1, 'Page Follower ID is required'),
});

// ✅ TypeScript Type Inference
export type DeleteFollowingRequestParamDto = z.infer<
  typeof DeleteFollowingRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const DeleteFollowingResponseDto = z.lazy(() =>
  PageFollower.extend({
    message: z.string().nullable().optional(),
  })
    .nullable()
    .optional(),
);

// ✅ TypeScript Type for Response
export type DeleteFollowingResponseDto = z.infer<
  typeof DeleteFollowingResponseDto
>;
