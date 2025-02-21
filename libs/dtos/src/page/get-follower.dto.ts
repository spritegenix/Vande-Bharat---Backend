import { z } from 'zod';

// ✅ Signup Request Schema (Zod)
export const GetFollowerRequestBodyDto = z.object({});

// ✅ TypeScript Type Inference
export type GetFollowerRequestBodyDto = z.infer<
  typeof GetFollowerRequestBodyDto
>;

// ✅ Signup Request Schema (Zod)
export const GetFollowerRequestParamDto = z.object({
  pageId: z
    .string()
    .trim() // First trim to clean the string
    .min(1, 'Page ID is required'), // Ensure it's not empty
  followerId: z.string().trim().optional(),
});

// ✅ TypeScript Type Inference
export type GetFollowerRequestParamDto = z.infer<
  typeof GetFollowerRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const GetFollowerResponseDto = z
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
export type GetFollowerResponseDto = z.infer<typeof GetFollowerResponseDto>;
