import { z } from 'zod';
import { User } from './user.schema';
import { Page } from './page.schema';

// Define Status Enum separately
export const DonationStatus = z.enum(['PENDING', 'PAID']).nullable().optional();
export type DonationStatus = z.infer<typeof DonationStatus>;

// Donation Schema
export const Donation = z
  .object({
    id: z.string().nullable().optional(),
    amount: z.number().nullable().optional(), // Handling Decimal as a number
    description: z.any().nullable().optional(), // JSON field
    status: DonationStatus.nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    userId: z.string().nullable().optional(),
    user: z
      .lazy(() => User.nullable().optional())
      .nullable()
      .optional(),
    pageId: z.string().nullable().optional(),
    page: z
      .lazy(() => Page.nullable().optional())
      .nullable()
      .optional(),
    donationHistory: z
      .lazy(() => DonationHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    donationHistory: true,
  })
  .nullable()
  .optional();

// Donation History Schema
export const DonationHistory = z
  .object({
    id: z.string().nullable().optional(),
    donationId: z.string().nullable().optional(),
    amount: z.number().nullable().optional(), // Handling Decimal as a number
    description: z.any().nullable().optional(), // JSON field
    status: DonationStatus.nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    userId: z.string().nullable().optional(),
    pageId: z.string().nullable().optional(),

    donation: z
      .lazy(() => Donation.nullable().optional())
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

// Define types based on schemas
export type Donation = z.infer<typeof Donation>;
export type DonationHistory = z.infer<typeof DonationHistory>;
