import { z } from 'zod';
// import { User } from '../schema';

// Define the UserMeResponseDto using the User schema
export const GetUserRequestBodyDto = z.any();
// Correctly infer the type of UserMeResponseDto
export type GetUserRequestBodyDto = z.infer<typeof GetUserRequestBodyDto>;

export const GetUserRequestParamDto = z.any();
// Correctly infer the type of UserMeResponseDto
export type GetUserRequestParamDto = z.infer<typeof GetUserRequestParamDto>;

export const GetUserResponseDto = z
  .object({
    hash: z.any(),
    ipAddress: z.any(),
    userHistory: z.any(),
  })
  .omit({ hash: true, ipAddress: true, userHistory: true })
  .passthrough();
// Correctly infer the type of UserMeResponseDto
export type GetUserResponseDto = z.infer<typeof GetUserResponseDto>;
