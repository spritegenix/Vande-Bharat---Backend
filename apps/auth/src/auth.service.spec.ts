import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '@app/prisma';
import { JwtUtil, OtpUtil, PasswordUtil } from './utils';
import { CredentialUtil } from './utils/credential.utils';
import { SlugUtil } from './utils/slug.utils';
import { ConfigService } from '@nestjs/config';
import { ErrorUtil } from './utils/error.utils';

import { ForbiddenException } from '@nestjs/common';
import { SignupRequestDto, VerifyOtpRequestDto } from '@app/dtos';

describe('AuthService', () => {
  let authService: AuthService;
  //   let prismaService: PrismaService;
  //   let userId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        JwtUtil,
        OtpUtil,
        PasswordUtil,
        CredentialUtil,
        SlugUtil,
        ConfigService,
        ErrorUtil,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    // prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should sign up a new user first', async () => {
    // jest
    //   .spyOn(prismaService.credential, 'findFirst')
    //   .mockResolvedValueOnce(null);

    // jest
    //   .spyOn(prismaService, '$transaction')
    //   .mockImplementation(async (callback) => {
    //     return await callback({
    //       user: {
    //         create: jest.fn().mockResolvedValueOnce({ id: '1' }),
    //       },
    //       credential: {
    //         findFirst: jest.fn().mockResolvedValueOnce(null),
    //         deleteMany: jest.fn().mockResolvedValueOnce({ count: 1 }),
    //         create: jest.fn().mockResolvedValueOnce({ id: 'credential-1' }),
    //       },
    //     } as any);
    //   });

    const result = await authService.signup({
      email: 'test@example.com',
      password: 'password',
      name: 'Test Page',
    } as SignupRequestDto);

    expect(result.message).toContain('Verification code sent');
    // userId = '1'; // ✅ Store user ID for future tests
  });

  it('should fail OTP verification with incorrect OTP', async () => {
    // jest.spyOn(prismaService.credential, 'findFirst').mockResolvedValueOnce({
    //   id: 'credential-otp',
    //   value: 'test@example.com',
    //   isVerified: false,
    //   otp: '123456',
    //   otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
    //   user: {
    //     id: userId, // ✅ Use stored user ID
    //     ownedPages: [{ id: 'page-1', name: 'Test Page', isDefault: true }],
    //   },
    // } as any);

    const dto: VerifyOtpRequestDto = {
      email: 'test@example.com',
      otp: '999999', // ❌ Incorrect OTP
    };

    await expect(authService.verifyOtp(dto)).rejects.toThrow(
      new ForbiddenException('Invalid or expired OTP'),
    );
  });

  it('should successfully verify OTP with correct credentials', async () => {
    // jest.spyOn(prismaService.credential, 'findFirst').mockResolvedValueOnce({
    //   id: 'credential-otp',
    //   value: 'test@example.com',
    //   isVerified: false,
    //   otp: '123456',
    //   otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
    //   user: {
    //     id: userId, // ✅ Use stored user ID
    //     ownedPages: [{ id: 'page-1', name: 'Test Page', isDefault: true }],
    //   },
    // } as any);

    // jest.spyOn(prismaService.credential, 'update').mockResolvedValueOnce({
    //   id: 'credential-otp',
    //   value: 'test@example.com',
    //   isVerified: true,
    //   otp: null,
    //   otpExpiresAt: null,
    //   user: {
    //     id: userId, // ✅ Use stored user ID
    //     ownedPages: [{ id: 'page-1', name: 'Test Page', isDefault: true }],
    //   },
    // } as any);

    const dto: VerifyOtpRequestDto = {
      email: 'test@example.com',
      otp: '123456', // ✅ Correct OTP
    };

    const otpVerification = await authService.verifyOtp(dto);
    expect(otpVerification.credentials[0].isVerified).toBe(true);
  });

  it('should throw error if credentials already exist (after OTP verification)', async () => {
    // jest.spyOn(prismaService.credential, 'findFirst').mockResolvedValueOnce({
    //   id: 'existing-credential',
    //   value: 'test@example.com',
    //   isVerified: true,
    //   user: { id: userId },
    // } as any);

    await expect(
      authService.signup({
        email: 'test@example.com',
        password: 'password',
        name: 'Test Page',
      } as SignupRequestDto),
    ).rejects.toThrow(new ForbiddenException('Credentials already in use'));
  });
});
