import { z } from 'zod';

// ✅ Validate Token Request Schema (Zod)
export const ValidateTokenRequestDto = z.object({
  token: z.string().min(1, 'Token is required'),
});

// ✅ TypeScript Type Inference for Request DTO
export type ValidateTokenRequestDto = z.infer<typeof ValidateTokenRequestDto>;

// ✅ Validate Token Response Schema (Zod)
export const ValidateTokenResponseDto = z
  .object({
    id: z.any().optional(),
  })
  .optional();

// ✅ TypeScript Type Inference for Response DTO
export type ValidateTokenResponseDto = z.infer<typeof ValidateTokenResponseDto>;
