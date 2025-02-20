import { z } from 'zod';
// import { User } from '../schema';

// Define the UserMeResponseDto using the User schema
export const GetUserRequestBodyDto = z.any();
// Correctly infer the type of UserMeResponseDto
export type GetUserRequestBodyDto = z.infer<typeof GetUserRequestBodyDto>;

export const GetUserRequestParamDto = z.object({
  userId: z.string().trim().optional(),
});
// Correctly infer the type of UserMeResponseDto
export type GetUserRequestParamDto = z.infer<typeof GetUserRequestParamDto>;

export const GetUserResponseDto = z
  .object({
    hash: z.unknown(),
    ipAddress: z.unknown(),
    userHistory: z.unknown(),
  })
  .passthrough()
  .transform(
    (
      { hash, ipAddress, userHistory, ...rest }, // eslint-disable-line @typescript-eslint/no-unused-vars
    ) => rest,
  );

export type GetUserResponseDto = z.infer<typeof GetUserResponseDto>;
