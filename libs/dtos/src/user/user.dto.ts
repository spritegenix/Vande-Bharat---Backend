import { z } from 'zod';
import { User } from '../schema';

export const UserMeResponseDto = User;

export type UserMeResponseDto = z.infer<typeof UserMeResponseDto>;
