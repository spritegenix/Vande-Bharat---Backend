import { z } from 'zod';

export const LoginRequestDto = z
  .object({
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(/^\+\d{1,3}\d{10}$/)
      .optional(),
    password: z.string().min(6),
  })
  .refine((data) => data.email || data.phone, {
    message: 'Either email or phone must be provided',
    path: ['email', 'phone'],
  });

export type LoginRequestDto = z.infer<typeof LoginRequestDto>;

// ✅ Verify OTP Response Schema (Zod)
export const LoginResponseDto = z
  .object({
    token: z.any().optional(),
  })
  .optional();

// ✅ TypeScript Type Inference for Response DTO
export type LoginResponseDto = z.infer<typeof LoginResponseDto>;
