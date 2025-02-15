import { z } from 'zod';
import { User } from './user.schema';
import { Post } from './post.schema';
import { Product } from './ecommerce.schema';
import { Tag } from './tags.schema';
import { Address } from './address.schema';
import { Donation } from './donation.schema';
import { Report } from './report.schema';
import { Category } from './category.schema';

// Define Enums Separately
export const FollowStatus = z
  .enum(['PENDING', 'ACCEPTED', 'REJECTED'])
  .nullable()
  .optional();
export type FollowStatus = z.infer<typeof FollowStatus>;

// Page Schema
export const Page = z
  .object({
    id: z.string().nullable().optional(),
    slug: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    banner: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),
    pageContactDetails: z.any().nullable().optional(), // JSON field
    isVerified: z.boolean().nullable().optional(),
    isDefault: z.boolean().nullable().optional(),
    isHidden: z.boolean().nullable().optional(),
    isBlocked: z.boolean().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    followerCount: z.number().nullable().optional(),
    postCount: z.number().nullable().optional(),

    ownerId: z.string().nullable().optional(),
    owner: z
      .lazy(() => User.nullable().optional())
      .nullable()
      .optional(),

    followers: z
      .lazy(() => PageFollower.array().nullable().optional())
      .nullable()
      .optional(),
    posts: z
      .lazy(() => Post.array().nullable().optional())
      .nullable()
      .optional(),
    products: z
      .lazy(() => Product.array().nullable().optional())
      .nullable()
      .optional(),
    categories: z
      .lazy(() => Category.array().nullable().optional())
      .nullable()
      .optional(),
    tags: z
      .lazy(() => Tag.array().nullable().optional())
      .nullable()
      .optional(),
    addresses: z
      .lazy(() => Address.array().nullable().optional())
      .nullable()
      .optional(),
    donations: z
      .lazy(() => Donation.array().nullable().optional())
      .nullable()
      .optional(),
    reports: z
      .lazy(() => Report.array().nullable().optional())
      .nullable()
      .optional(),
    pageHistory: z
      .lazy(() => PageHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    pageHistory: true,
  });

// Page Follower Schema
export const PageFollower = z
  .object({
    id: z.string().nullable().optional(),
    status: FollowStatus.nullable().optional(),

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
    pageFollowerHistory: z
      .lazy(() => PageFollowerHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    pageFollowerHistory: true,
  });

// Page History Schema
export const PageHistory = z.object({
  id: z.string().nullable().optional(),
  pageId: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  banner: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  pageContactDetails: z.any().nullable().optional(), // JSON field
  isVerified: z.boolean().nullable().optional(),
  isDefault: z.boolean().nullable().optional(),
  isHidden: z.boolean().nullable().optional(),
  isBlocked: z.boolean().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  followerCount: z.number().nullable().optional(),
  postCount: z.number().nullable().optional(),

  ownerId: z.string().nullable().optional(),
  page: z
    .lazy(() => Page.nullable().optional())
    .nullable()
    .optional(),
});

// Page Follower History Schema
export const PageFollowerHistory = z.object({
  id: z.string().nullable().optional(),
  pageFollowerId: z.string().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  userId: z.string().nullable().optional(),
  pageId: z.string().nullable().optional(),

  pageFollower: z
    .lazy(() => PageFollower.nullable().optional())
    .nullable()
    .optional(),
});

// Define types based on schemas
export type Page = z.infer<typeof Page>;
export type PageFollower = z.infer<typeof PageFollower>;
export type PageHistory = z.infer<typeof PageHistory>;
export type PageFollowerHistory = z.infer<typeof PageFollowerHistory>;
