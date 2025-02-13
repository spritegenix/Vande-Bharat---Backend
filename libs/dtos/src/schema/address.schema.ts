import { z } from 'zod';
import { Page } from './page.schema';
import { Group } from './group.schema';
import { Post } from './post.schema';

// Address Schema
export const Address = z
  .object({
    id: z.string().nullable().optional(),
    order: z.number().nullable().optional(),
    street: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    pincode: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    pageId: z.string().nullable().optional(),
    groupId: z.string().nullable().optional(),
    postId: z.string().nullable().optional(),

    page: z
      .lazy(() => Page.nullable().optional())
      .nullable()
      .optional(),
    group: z
      .lazy(() => Group.nullable().optional())
      .nullable()
      .optional(),
    post: z
      .lazy(() => Post.nullable().optional())
      .nullable()
      .optional(),
    addressHistory: z
      .lazy(() => AddressHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    addressHistory: true,
  })
  .nullable()
  .optional();

// Address History Schema
export const AddressHistory = z
  .object({
    id: z.string().nullable().optional(),
    addressId: z.string().nullable().optional(),
    order: z.number().nullable().optional(),
    street: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    pincode: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    address: z
      .lazy(() => Address.nullable().optional())
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

// Types inferred correctly
export type Address = z.infer<typeof Address>;
export type AddressHistory = z.infer<typeof AddressHistory>;
