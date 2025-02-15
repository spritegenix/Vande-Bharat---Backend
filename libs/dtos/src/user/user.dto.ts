import { z } from 'zod';
import { Credential, User } from '../schema';

// Define the UserMeResponseDto using the User schema
export const UserMeResponseDto = z.lazy(() => User.nullable().optional());

// Correctly infer the type of UserMeResponseDto
export type UserMeResponseDto = z.infer<typeof UserMeResponseDto>;

// Define the UserCredentialResponseDto with the correct syntax
export const UserCredentialResponseDto = z.lazy(() =>
  Credential.array().nullable().optional(),
);
// Correctly infer the type of UserCredentialResponseDto
export type UserCredentialResponseDto = z.infer<
  typeof UserCredentialResponseDto
>;
