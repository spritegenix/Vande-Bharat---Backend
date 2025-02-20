import { z } from 'zod';

// ✅ Signup Request Schema (Zod)
export const CreatePageRequestBodyDto = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  description: z.string().trim().optional(),
  pageContactDetails: z
    .unknown() // Use unknown for better safety than z.any()
    .transform((val) => {
      if (val) {
        try {
          // Check if the value is a valid JSON string or object, and parse it accordingly
          return typeof val === 'string'
            ? JSON.parse(val) // If it's a string, parse it
            : val; // If it's already an object, return as is
        } catch {
          return undefined; // Return undefined if JSON parsing fails
        }
      }
      return undefined; // If val is falsy, return undefined
    })
    .optional(),
});

// ✅ TypeScript Type Inference
export type CreatePageRequestBodyDto = z.infer<typeof CreatePageRequestBodyDto>;

export const CreatePageRequestParamDto = z.any();

export type CreatePageRequestParamDto = z.infer<
  typeof CreatePageRequestParamDto
>;

// ✅ Signup Response Schema (Zod)
export const CreatePageResponseDto = z
  .object({
    pageHistory: z.any(),
  })
  .transform(
    (
      { pageHistory, ...rest }, // eslint-disable-line @typescript-eslint/no-unused-vars
    ) => rest,
  );

// ✅ TypeScript Type for Response
export type CreatePageResponseDto = z.infer<typeof CreatePageResponseDto>;
