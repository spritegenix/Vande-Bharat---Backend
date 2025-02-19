import { z } from 'zod';
import { PageFollower } from '../schema';

// ✅ Signup Request Schema (Zod)
export const DeleteFollowersRequestBodyDto = z.any();

// ✅ TypeScript Type Inference
export type DeleteFollowersRequestBodyDto = z.infer<
  typeof DeleteFollowersRequestBodyDto
>;

// ✅ Signup Request Schema (Zod)
export const DeleteFollowersRequestParamDto = z.object({
  pageId: z
    .string()
    .trim() // First trim to clean the string
    .min(1, 'Page ID is required'), // Ensure it's not empty

  followerId: z.string().trim().min(1, 'Page Follower ID is required'),
});

// ✅ TypeScript Type Inference
export type DeleteFollowersRequestParamDto = z.infer<
  typeof DeleteFollowersRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const DeleteFollowersResponseDto = z.lazy(() =>
  PageFollower.extend({
    message: z.string().nullable().optional(),
  })
    .nullable()
    .optional(),
);

// ✅ TypeScript Type for Response
export type DeleteFollowersResponseDto = z.infer<
  typeof DeleteFollowersResponseDto
>;
