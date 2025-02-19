import { z } from 'zod';
import { PageFollower } from '../schema';

// ✅ Signup Request Schema (Zod)
export const GetFollowersRequestBodyDto = z.object({});

// ✅ TypeScript Type Inference
export type GetFollowersRequestBodyDto = z.infer<
  typeof GetFollowersRequestBodyDto
>;

// ✅ Signup Request Schema (Zod)
export const GetFollowersRequestParamDto = z.object({
  pageId: z
    .string()
    .trim() // First trim to clean the string
    .min(1, 'Page ID is required'), // Ensure it's not empty
  followerId: z.string().trim().optional(),
});

// ✅ TypeScript Type Inference
export type GetFollowersRequestParamDto = z.infer<
  typeof GetFollowersRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const GetFollowersResponseDto = z.lazy(() =>
  PageFollower.array().nullable().optional(),
);

// ✅ TypeScript Type for Response
export type GetFollowersResponseDto = z.infer<typeof GetFollowersResponseDto>;
