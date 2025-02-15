import { z } from 'zod';

// ✅ Validate Token Request Schema (Zod)
export const ValidateHeaderRequestBodyDto = z.object({
  headers: z.any(),
});

// ✅ TypeScript Type Inference for Request DTO
export type ValidateHeaderRequestBodyDto = z.infer<
  typeof ValidateHeaderRequestBodyDto
>;

// ✅ Validate Token Request Schema (Zod)
export const ValidateHeaderPayloadDto = z.object({
  headers: z.any(),
});

// ✅ TypeScript Type Inference for Request DTO
export type ValidateHeaderPayloadDto = z.infer<typeof ValidateHeaderPayloadDto>;

// ✅ Validate Token Response Schema (Zod)
export const ValidateHeaderResponseDto = z.object({
  id: z.string(),
});

// ✅ TypeScript Type Inference for Response DTO
export type ValidateHeaderResponseDto = z.infer<
  typeof ValidateHeaderResponseDto
>;
