import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ForbiddenException } from '@nestjs/common';
import { SignupRequestDto, VerifyOtpRequestDto } from '@app/dtos';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  //   let userId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest
              .fn()
              .mockResolvedValue({ message: 'Verification code sent' }),
            login: jest.fn().mockResolvedValue({ token: 'mocked-jwt-token' }),
            verifyOtp: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', async () => {
    expect(authController).toBeDefined();
  });

  it('should call signup and return response', async () => {
    const dto: SignupRequestDto = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test Page',
    };

    const response = await authController.signup(dto);
    expect(authService.signup).toHaveBeenCalledWith(dto);
    expect(response.message).toBe('Verification code sent');

    // userId = '1'; // ✅ Store user ID for future tests
  });

  it('should fail OTP verification with incorrect OTP', async () => {
    authService.verifyOtp = jest
      .fn()
      .mockRejectedValue(new ForbiddenException('Invalid or expired OTP'));

    const dto: VerifyOtpRequestDto = {
      email: 'test@example.com',
      otp: '999999', // ❌ Incorrect OTP
    };

    await expect(authController.verifyOtp(dto)).rejects.toThrow(
      new ForbiddenException('Invalid or expired OTP'),
    );
  });

  it('should successfully verify OTP with correct credentials', async () => {
    authService.verifyOtp = jest.fn().mockResolvedValue({
      credentials: [{ isVerified: true }],
    });

    const dto: VerifyOtpRequestDto = {
      email: 'test@example.com',
      otp: '123456', // ✅ Correct OTP
    };

    const otpVerification = await authController.verifyOtp(dto);
    expect(otpVerification.credentials[0].isVerified).toBe(true);
  });

  it('should call login and return JWT token', async () => {
    const dto = { email: 'test@example.com', password: 'password' };
    const response = await authController.login(dto);
    expect(authService.login).toHaveBeenCalledWith(dto);
    expect(response.token).toBe('mocked-jwt-token');
  });

  it('should throw error if credentials already exist (after OTP verification)', async () => {
    authService.signup = jest
      .fn()
      .mockRejectedValue(new ForbiddenException('Credentials already in use'));

    const dto: SignupRequestDto = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test Page',
    };

    await expect(authController.signup(dto)).rejects.toThrow(
      new ForbiddenException('Credentials already in use'),
    );
  });
});
