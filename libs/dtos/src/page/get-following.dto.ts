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

// ✅ Signup Request Schema (Zod)
export const GetFollowingRequestQueryDto = z.object({
  search: z.string().trim().optional(),
  cursor: z.any(),
  limit: z.number().int().default(10),
  orderBy: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
  orderDirection: z.enum(['asc', 'desc']).default('desc'),
});

// ✅ TypeScript Type Inference
export type GetFollowingRequestQueryDto = z.infer<
  typeof GetFollowingRequestQueryDto
>;

// ✅ Signup Response Schema (Zod)
export const GetFollowingResponseDto = z
  .object({
    following: z
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
      .optional(),
    nextCursor: z.string().nullable().optional(),
  })
  .optional()
  .nullable();

// ✅ TypeScript Type for Response
export type GetFollowingResponseDto = z.infer<typeof GetFollowingResponseDto>;
