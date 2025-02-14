import { z } from 'zod';

export const AddCredentialRequestDto = z
  .object({
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(/^\+\d{1,3}\d{7,14}$/, 'Invalid phone number format')
      .optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: 'Either email or phone must be provided',
    path: ['email', 'phone'],
  });

export type AddCredentialRequestDto = z.infer<typeof AddCredentialRequestDto>;

export const AddCredentialPayloadDto = z
  .object({
    id: z.string(),
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(/^\+\d{1,3}\d{7,14}$/, 'Invalid phone number format')
      .optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: 'Either email or phone must be provided',
    path: ['email', 'phone'],
  });

export type AddCredentialPayloadDto = z.infer<typeof AddCredentialPayloadDto>;

// ✅ Verify OTP Response Schema (Zod)
export const AddCredentialResponseDto = z.object({
  message: z.string(),
});

// ✅ TypeScript Type Inference for Response DTO
export type AddCredentialResponseDto = z.infer<typeof AddCredentialResponseDto>;
