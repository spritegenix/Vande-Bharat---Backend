import { string, z } from 'zod';
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
    razorpayId: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    donator: z
      .lazy(() => Page.nullable().optional())
      .nullable()
      .optional(),
    donatorId: z.string().nullable().optional(),

    donated: z
      .lazy(() => Page.nullable().optional())
      .nullable()
      .optional(),
    donatedId: z.string().nullable().optional(),

    donationHistory: z
      .lazy(() => DonationHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    donationHistory: true,
  });

// Donation History Schema
export const DonationHistory = z.object({
  id: z.string().nullable().optional(),
  donationId: z.string().nullable().optional(),
  amount: z.number().nullable().optional(), // Handling Decimal as a number
  description: z.any().nullable().optional(), // JSON field
  status: string().nullable().optional(),
  razorpayId: z.string().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  donatorId: z.string().nullable().optional(),
  donatedId: z.string().nullable().optional(),

  donation: z
    .lazy(() => Donation.nullable().optional())
    .nullable()
    .optional(),
});

// Define types based on schemas
export type Donation = z.infer<typeof Donation>;
export type DonationHistory = z.infer<typeof DonationHistory>;
