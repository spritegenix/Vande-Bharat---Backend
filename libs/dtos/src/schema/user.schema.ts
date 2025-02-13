import { z } from 'zod';
import { Comment, Reaction, Bookmark } from './post.schema';
import { Notification } from './notification.schema';
import { Report } from './report.schema';
import { Group, GroupMember } from './group.schema';
import { Page, PageFollower } from './page.schema';
import { Order, CartItem } from './ecommerce.schema';
import { Donation } from './donation.schema';

// Define Enums Separately
export const CredentialType = z.enum(['EMAIL', 'PHONE']).nullable().optional();
export type CredentialType = z.infer<typeof CredentialType>;

// User Schema
export const User = z
  .object({
    id: z.string().nullable().optional(),
    hash: z.string().nullable().optional(),
    isVerified: z.boolean().nullable().optional(),
    isHidden: z.boolean().nullable().optional(),
    isBlocked: z.boolean().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    ipAddresses: z
      .lazy(() => IpAddress.array().nullable().optional())
      .nullable()
      .optional(),
    credentials: z
      .lazy(() => Credential.array().nullable().optional())
      .nullable()
      .optional(),
    comments: z
      .lazy(() => Comment.array().nullable().optional())
      .nullable()
      .optional(),
    reactions: z
      .lazy(() => Reaction.array().nullable().optional())
      .nullable()
      .optional(),
    ownedGroups: z
      .lazy(() => Group.array().nullable().optional())
      .nullable()
      .optional(),
    groupMembers: z
      .lazy(() => GroupMember.array().nullable().optional())
      .nullable()
      .optional(),
    ownedPages: z
      .lazy(() => Page.array().nullable().optional())
      .nullable()
      .optional(),
    pageFollowers: z
      .lazy(() => PageFollower.array().nullable().optional())
      .nullable()
      .optional(),
    orders: z
      .lazy(() => Order.array().nullable().optional())
      .nullable()
      .optional(),
    cartItems: z
      .lazy(() => CartItem.array().nullable().optional())
      .nullable()
      .optional(),
    donations: z
      .lazy(() => Donation.array().nullable().optional())
      .nullable()
      .optional(),
    bookmarks: z
      .lazy(() => Bookmark.array().nullable().optional())
      .nullable()
      .optional(),
    reports: z
      .lazy(() => Report.array().nullable().optional())
      .nullable()
      .optional(),
    notifications: z
      .lazy(() => Notification.array().nullable().optional())
      .nullable()
      .optional(),
    userHistory: z
      .lazy(() => UserHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    hash: true,
    userHistory: true,
  })
  .nullable()
  .optional();

// IP Address Schema
export const IpAddress = z
  .object({
    id: z.string().nullable().optional(),
    ipV4: z.string().nullable().optional(),
    ipV6: z.string().nullable().optional(),
    timestamp: z.date().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    userId: z.string().nullable().optional(),
    user: z
      .lazy(() => User.nullable().optional())
      .nullable()
      .optional(),
    ipAddressHistory: z
      .lazy(() => IpAddressHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    ipAddressHistory: true,
  })
  .nullable()
  .optional();

// Credential Schema
export const Credential = z
  .object({
    id: z.string().nullable().optional(),
    type: CredentialType.nullable().optional(),
    value: z.string().nullable().optional(),
    isVerified: z.boolean().nullable().optional(),
    isPrimary: z.boolean().nullable().optional(),
    verifiedAt: z.date().nullable().optional(),
    order: z.number().nullable().optional(),
    otp: z.string().nullable().optional(),
    otpExpiresAt: z.date().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    userId: z.string().nullable().optional(),
    user: z
      .lazy(() => User.nullable().optional())
      .nullable()
      .optional(),
    credentialHistory: z
      .lazy(() => CredentialHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    credentialHistory: true,
  })
  .nullable()
  .optional();

// User History Schema
export const UserHistory = z
  .object({
    id: z.string().nullable().optional(),
    userId: z.string().nullable().optional(),
    hash: z.string().nullable().optional(),
    isVerified: z.boolean().nullable().optional(),
    isHidden: z.boolean().nullable().optional(),
    isBlocked: z.boolean().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    user: z
      .lazy(() => User.nullable().optional())
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

// IP Address History Schema
export const IpAddressHistory = z
  .object({
    id: z.string().nullable().optional(),
    ipAddressId: z.string().nullable().optional(),
    ipV4: z.string().nullable().optional(),
    ipV6: z.string().nullable().optional(),
    timestamp: z.date().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    userId: z.string().nullable().optional(),

    ipAddress: z
      .lazy(() => IpAddress.nullable().optional())
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

// Credential History Schema
export const CredentialHistory = z
  .object({
    id: z.string().nullable().optional(),
    credentialId: z.string().nullable().optional(),
    type: CredentialType.nullable().optional(),
    value: z.string().nullable().optional(),
    isVerified: z.boolean().nullable().optional(),
    isPrimary: z.boolean().nullable().optional(),
    verifiedAt: z.date().nullable().optional(),
    order: z.number().nullable().optional(),
    otp: z.string().nullable().optional(),
    otpExpiresAt: z.date().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    userId: z.string().nullable().optional(),

    credential: z
      .lazy(() => Credential.nullable().optional())
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

// Define types based on schemas
export type User = z.infer<typeof User>;
export type IpAddress = z.infer<typeof IpAddress>;
export type Credential = z.infer<typeof Credential>;
export type UserHistory = z.infer<typeof UserHistory>;
export type IpAddressHistory = z.infer<typeof IpAddressHistory>;
export type CredentialHistory = z.infer<typeof CredentialHistory>;
