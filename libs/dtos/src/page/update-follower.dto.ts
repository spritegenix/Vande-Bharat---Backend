import { z } from 'zod';
import { FollowStatus } from '@prisma/client';

// ✅ Signup Request Schema (Zod)
export const UpdateFollowerRequestBodyDto = z.object({
  status: z
    .string() // Ensures input is a string
    .transform((val) => FollowStatus[val as keyof typeof FollowStatus])
    .refine(
      (val) => Object.values(FollowStatus).includes(val as FollowStatus),
      {
        message: 'Invalid status value',
      },
    ),
});

// ✅ TypeScript Type Inference
export type UpdateFollowerRequestBodyDto = z.infer<
  typeof UpdateFollowerRequestBodyDto
>;

// ✅ Signup Request Schema (Zod)
export const UpdateFollowerRequestParamDto = z.object({
  pageId: z
    .string()
    .trim() // First trim to clean the string
    .min(1, 'Page ID is required'), // Ensure it's not empty

  followerId: z.string().trim().min(1, 'Page Follower ID is required'),
});

// ✅ TypeScript Type Inference
export type UpdateFollowerRequestParamDto = z.infer<
  typeof UpdateFollowerRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const UpdateFollowerResponseDto = z
  .object({
    pageHistory: z.any(),
  })
  .omit({ pageHistory: true })
  .passthrough();

// ✅ TypeScript Type for Response
export type UpdateFollowerResponseDto = z.infer<
  typeof UpdateFollowerResponseDto
>;
