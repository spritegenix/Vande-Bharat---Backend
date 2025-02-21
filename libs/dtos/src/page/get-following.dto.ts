import { z } from 'zod';

// ✅ Signup Request Schema (Zod)
export const GetFollowingRequestBodyDto = z.any();

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

  followingId: z.string().trim().optional(),
});

// ✅ TypeScript Type Inference
export type GetFollowingRequestParamDto = z.infer<
  typeof GetFollowingRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const GetFollowingResponseDto = z
  .object({
    pageFollowerHistory: z.any(),
  })
  .passthrough()
  .transform(
    (
      { pageFollowerHistory, ...rest }, // eslint-disable-line @typescript-eslint/no-unused-vars
    ) => rest,
  )
  .array()
  .nullable()
  .optional();

// ✅ TypeScript Type for Response
export type GetFollowingResponseDto = z.infer<typeof GetFollowingResponseDto>;
