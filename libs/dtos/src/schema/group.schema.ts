import { z } from 'zod';
import { Category } from './category.schema';
import { Post } from './post.schema';
import { Tag } from './tags.schema';
import { Address } from './address.schema';
import { Report } from './report.schema';
import { Page } from './page.schema';

// Define Enums Separately
export const GroupPrivacy = z.enum(['PRIVATE', 'PUBLIC']).nullable().optional();
export type GroupPrivacy = z.infer<typeof GroupPrivacy>;

export const MemberStatus = z
  .enum(['PENDING', 'ACCEPTED', 'REJECTED'])
  .nullable()
  .optional();
export type MemberStatus = z.infer<typeof MemberStatus>;

// Group Schema
export const Group = z
  .object({
    id: z.string().nullable().optional(),
    slug: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    description: z.any().nullable().optional(), // JSON field
    privacy: GroupPrivacy.nullable().optional(),
    banner: z.string().nullable().optional(),
    isHidden: z.boolean().nullable().optional(),
    isBlocked: z.boolean().nullable().optional(),
    isVerified: z.boolean().nullable().optional(),
    membersCount: z.number().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    owner: z
      .lazy(() => Page.nullable().optional())
      .nullable()
      .optional(),
    ownerId: z.string().nullable().optional(),
    addresses: z
      .lazy(() => Address.array().nullable().optional())
      .nullable()
      .optional(),
    members: z
      .lazy(() => GroupMember.array().nullable().optional())
      .nullable()
      .optional(),
    category: z
      .lazy(() => Category.nullable().optional())
      .nullable()
      .optional(),
    categoryId: z.string().nullable().optional(),
    posts: z
      .lazy(() => Post.array().nullable().optional())
      .nullable()
      .optional(),
    reports: z
      .lazy(() => Report.array().nullable().optional())
      .nullable()
      .optional(),
    tags: z
      .lazy(() => Tag.array().nullable().optional())
      .nullable()
      .optional(),

    groupHistory: z
      .lazy(() => GroupHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    groupHistory: true,
  });

// Group Member Schema
export const GroupMember = z
  .object({
    id: z.string().nullable().optional(),
    status: MemberStatus.nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    group: z
      .lazy(() => Group.nullable().optional())
      .nullable()
      .optional(),
    groupId: z.string().nullable().optional(),
    member: z
      .lazy(() => Page.nullable().optional())
      .nullable()
      .optional(),
    memberId: z.string().nullable().optional(),

    groupMemberHistory: z
      .lazy(() => GroupMemberHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    groupMemberHistory: true,
  });

// Group History Schema
export const GroupHistory = z.object({
  id: z.string().nullable().optional(),
  groupId: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  description: z.any().nullable().optional(), // JSON field
  privacy: z.string().nullable().optional(),
  banner: z.string().nullable().optional(),
  isHidden: z.boolean().nullable().optional(),
  isBlocked: z.boolean().nullable().optional(),
  isVerified: z.boolean().nullable().optional(),
  membersCount: z.number().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  ownerId: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),

  group: z
    .lazy(() => Group.nullable().optional())
    .nullable()
    .optional(),
});

// Group Member History Schema
export const GroupMemberHistory = z.object({
  id: z.string().nullable().optional(),
  groupMemberId: z.string().nullable().optional(),
  status: z.string().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  groupId: z.string().nullable().optional(),
  memberId: z.string().nullable().optional(),

  groupMember: z
    .lazy(() => GroupMember.nullable().optional())
    .nullable()
    .optional(),
});

// Define types based on schemas
export type Group = z.infer<typeof Group>;
export type GroupMember = z.infer<typeof GroupMember>;
export type GroupHistory = z.infer<typeof GroupHistory>;
export type GroupMemberHistory = z.infer<typeof GroupMemberHistory>;
