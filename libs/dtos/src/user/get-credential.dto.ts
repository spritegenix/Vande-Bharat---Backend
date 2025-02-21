import { z } from 'zod';

// Define the CredentialMeResponseDto using the Credential schema
export const GetCredentialRequestBodyDto = z.any();
// Correctly infer the type of CredentialMeResponseDto
export type GetCredentialRequestBodyDto = z.infer<
  typeof GetCredentialRequestBodyDto
>;

export const GetCredentialRequestParamDto = z.object({
  userId: z.string().trim().optional(),
  credentialId: z.string().trim().optional(),
});
// Correctly infer the type of CredentialMeResponseDto
export type GetCredentialRequestParamDto = z.infer<
  typeof GetCredentialRequestParamDto
>;

export const GetCredentialResponseDto = z
  .object({
    otp: z.any(),
    otpExpiresAt: z.any(),
  })
  .passthrough()
  .transform(
    (
      { otp, otpExpiresAt, ...rest }, // eslint-disable-line @typescript-eslint/no-unused-vars
    ) => rest,
  )
  .array()
  .nullable()
  .optional();
// Correctly infer the type of CredentialMeResponseDto
export type GetCredentialResponseDto = z.infer<typeof GetCredentialResponseDto>;
