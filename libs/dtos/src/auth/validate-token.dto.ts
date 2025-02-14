import { z } from 'zod';

// ✅ Validate Token Request Schema (Zod)
export const ValidateTokenRequestDto = z.object({
  token: z.string(),
});

// ✅ TypeScript Type Inference for Request DTO
export type ValidateTokenRequestDto = z.infer<typeof ValidateTokenRequestDto>;

// ✅ Validate Token Request Schema (Zod)
export const ValidateTokenPayloadDto = z.object({
  token: z.string(),
});

// ✅ TypeScript Type Inference for Request DTO
export type ValidateTokenPayloadDto = z.infer<typeof ValidateTokenPayloadDto>;

// ✅ Validate Token Response Schema (Zod)
export const ValidateTokenResponseDto = z.object({
  id: z.string(),
});

// ✅ TypeScript Type Inference for Response DTO
export type ValidateTokenResponseDto = z.infer<typeof ValidateTokenResponseDto>;
