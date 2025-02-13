import { z } from 'zod';

// ✅ Verify OTP Request Schema (Zod)
export const VerifyOtpRequestDto = z
  .object({
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(/^\+\d{1,3}\d{10}$/)
      .optional(),
    otp: z.string().length(6, 'OTP must be exactly 6 digits'),
  })
  .refine((data) => data.email || data.phone, {
    message: 'Either email or phone must be provided',
    path: ['email', 'phone'],
  });

// ✅ TypeScript Type Inference for Request DTO
export type VerifyOtpRequestDto = z.infer<typeof VerifyOtpRequestDto>;

// ✅ Verify OTP Response Schema (Zod)
export const VerifyOtpResponseDto = z
  .object({
    token: z.any().optional(),
  })
  .optional();

// ✅ TypeScript Type Inference for Response DTO
export type VerifyOtpResponseDto = z.infer<typeof VerifyOtpResponseDto>;
