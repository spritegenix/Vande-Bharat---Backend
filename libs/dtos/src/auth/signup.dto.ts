import { z } from 'zod';

// ✅ Signup Request Schema (Zod)
export const SignupRequestDto = z
  .object({
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(/^\+\d{1,3}\d{10}$/)
      .optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    name: z.string().min(1, 'Name is required'),
  })
  .refine((data) => data.email || data.phone, {
    message: 'Either email or phone must be provided',
    path: ['email', 'phone'],
  });

// ✅ TypeScript Type Inference
export type SignupRequestDto = z.infer<typeof SignupRequestDto>;

export const SignupPayloadDto = z
  .object({
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(/^\+\d{1,3}\d{10}$/)
      .optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    name: z.string().min(1, 'Name is required'),
  })
  .refine((data) => data.email || data.phone, {
    message: 'Either email or phone must be provided',
    path: ['email', 'phone'],
  });

// ✅ TypeScript Type Inference
export type SignupPayloadDto = z.infer<typeof SignupPayloadDto>;

// ✅ Signup Response Schema (Zod)
export const SignupResponseDto = z.object({
  message: z.string(),
});

// ✅ TypeScript Type for Response
export type SignupResponseDto = z.infer<typeof SignupResponseDto>;
