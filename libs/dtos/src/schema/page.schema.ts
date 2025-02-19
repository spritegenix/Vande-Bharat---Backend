import { z } from 'zod';
import { User } from './user.schema';
import { Bookmark, Comment, Post, Reaction } from './post.schema';
import { CartItem, Order, Product } from './e-commerce.schema';
import { Tag } from './tags.schema';
import { Address } from './address.schema';
import { Donation } from './donation.schema';
import { Report } from './report.schema';
import { Category } from './category.schema';
import { Notification } from './notification.schema';
import { Group } from './group.schema';

// Define Enums Separately
export const FollowStatus = z
  .enum(['PENDING', 'ACCEPTED', 'REJECTED'])
  .nullable()
  .optional();
export type FollowStatus = z.infer<typeof FollowStatus>;

export const PagePrivacy = z.enum(['PUBLIC', 'PRIVATE']).nullable().optional();
export type PagePrivacy = z.infer<typeof PagePrivacy>;

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
    isDefault: z.boolean().nullable().optional(),
    isHidden: z.boolean().nullable().optional(),
    isBlocked: z.boolean().nullable().optional(),
    isVerified: z.boolean().nullable().optional(),
    followerCount: z.number().nullable().optional(),
    followingCount: z.number().nullable().optional(),
    postCount: z.number().nullable().optional(),
    privacy: PagePrivacy.nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    owner: z
      .lazy(() => User.nullable().optional())
      .nullable()
      .optional(),
    ownerId: z.string().nullable().optional(),

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
    notifications: z
      .lazy(() => Notification.array().nullable().optional())
      .nullable()
      .optional(),

    follower: z
      .lazy(() => PageFollower.array().nullable().optional())
      .nullable()
      .optional(),
    following: z
      .lazy(() => PageFollower.array().nullable().optional())
      .nullable()
      .optional(),

    ownedGroups: z
      .lazy(() => Group.array().nullable().optional())
      .nullable()
      .optional(),
    joinedGroups: z
      .lazy(() => Group.array().nullable().optional())
      .nullable()
      .optional(),

    posts: z
      .lazy(() => Post.array().nullable().optional())
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
    bookmarks: z
      .lazy(() => Bookmark.array().nullable().optional())
      .nullable()
      .optional(),

    orders: z
      .lazy(() => Order.array().nullable().optional())
      .nullable()
      .optional(),
    products: z
      .lazy(() => Product.array().nullable().optional())
      .nullable()
      .optional(),
    cartItems: z
      .lazy(() => CartItem.array().nullable().optional())
      .nullable()
      .optional(),

    donated: z
      .lazy(() => Donation.array().nullable().optional())
      .nullable()
      .optional(),
    donors: z
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
    statusUpdatedAt: z.date().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    follower: z
      .lazy(() => Page.nullable().optional())
      .nullable()
      .optional(),
    followerId: z.string().nullable().optional(),
    following: z
      .lazy(() => Page.nullable().optional())
      .nullable()
      .optional(),
    followingId: z.string().nullable().optional(),

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
  isDefault: z.boolean().nullable().optional(),
  isHidden: z.boolean().nullable().optional(),
  isBlocked: z.boolean().nullable().optional(),
  isVerified: z.boolean().nullable().optional(),
  followerCount: z.number().nullable().optional(),
  followingCount: z.number().nullable().optional(),
  postCount: z.number().nullable().optional(),
  privacy: z.string().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

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
  status: FollowStatus.nullable().optional(),
  statusUpdatedAt: z.date().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  followerId: z.string().nullable().optional(),
  followingId: z.string().nullable().optional(),

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
