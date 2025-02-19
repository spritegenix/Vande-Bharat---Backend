import { z } from 'zod';
import { PageFollower } from '../schema';
import { FollowStatus } from '@prisma/client';

// ✅ Signup Request Schema (Zod)
export const UpdateFollowStatusRequestBodyDto = z.object({
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
export type UpdateFollowStatusRequestBodyDto = z.infer<
  typeof UpdateFollowStatusRequestBodyDto
>;

// ✅ Signup Request Schema (Zod)
export const UpdateFollowStatusRequestParamDto = z.object({
  pageId: z
    .string()
    .trim() // First trim to clean the string
    .min(1, 'Page ID is required'), // Ensure it's not empty

  followerId: z.string().trim().min(1, 'Page Follower ID is required'),
});

// ✅ TypeScript Type Inference
export type UpdateFollowStatusRequestParamDto = z.infer<
  typeof UpdateFollowStatusRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const UpdateFollowStatusResponseDto = z.lazy(() =>
  PageFollower.extend({
    message: z.string().nullable().optional(),
  })
    .nullable()
    .optional(),
);

// ✅ TypeScript Type for Response
export type UpdateFollowStatusResponseDto = z.infer<
  typeof UpdateFollowStatusResponseDto
>;
