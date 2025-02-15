import { z } from 'zod';
import { Comment, Post } from './post.schema';
import { Group } from './group.schema';
import { Page } from './page.schema';
import { Product } from './ecommerce.schema';

// Tag Schema
export const Tag = z
  .object({
    id: z.string().nullable().optional(),
    name: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    posts: z
      .lazy(() => Post.array().nullable().optional())
      .nullable()
      .optional(),
    groups: z
      .lazy(() => Group.array().nullable().optional())
      .nullable()
      .optional(),
    pages: z
      .lazy(() => Page.array().nullable().optional())
      .nullable()
      .optional(),
    products: z
      .lazy(() => Product.array().nullable().optional())
      .nullable()
      .optional(),
    comments: z
      .lazy(() => Comment.array().nullable().optional())
      .nullable()
      .optional(),
    tagHistory: z
      .lazy(() => TagHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    tagHistory: true,
  });

// Tag History Schema
export const TagHistory = z.object({
  id: z.string().nullable().optional(),
  tagId: z.string().nullable().optional(),
  name: z.string().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  tag: z
    .lazy(() => Tag.nullable().optional())
    .nullable()
    .optional(),
});

// Define types based on schemas
export type Tag = z.infer<typeof Tag>;
export type TagHistory = z.infer<typeof TagHistory>;
