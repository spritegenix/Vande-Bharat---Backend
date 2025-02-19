import { any, z } from 'zod';
import { PageFollower } from '../schema';

// ✅ Signup Request Schema (Zod)
export const GetFollowingRequestBodyDto = any();

// ✅ TypeScript Type Inference
export type GetFollowingRequestBodyDto = z.infer<
  typeof GetFollowingRequestBodyDto
>;

// ✅ Signup Request Schema (Zod)
export const GetFollowingRequestParamDto = z.object({
  pageId: z
    .string()
    .trim() // First trim to clean the string
    .min(1, 'Page ID is required'), // Ensure it's not empty

  followingId: z.string().trim().min(1, 'Page Follower ID is required'),
});

// ✅ TypeScript Type Inference
export type GetFollowingRequestParamDto = z.infer<
  typeof GetFollowingRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const GetFollowingResponseDto = z.lazy(() =>
  PageFollower.extend({
    message: z.string().nullable().optional(),
  })
    .nullable()
    .optional(),
);

// ✅ TypeScript Type for Response
export type GetFollowingResponseDto = z.infer<typeof GetFollowingResponseDto>;
