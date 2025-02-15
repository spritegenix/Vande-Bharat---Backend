import { z } from 'zod';
import { Group } from './group.schema';
import { Page } from './page.schema';
import { Address } from './address.schema';
import { Tag } from './tags.schema';
import { Report } from './report.schema';
import { User } from './user.schema';

// Post Schema
export const Post = z
  .object({
    id: z.string().nullable().optional(),
    text: z.string().nullable().optional(),
    media: z.any().nullable().optional(), // JSON field
    isPinned: z.boolean().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    groupId: z.string().nullable().optional(),
    group: z
      .lazy(() => Group.nullable().optional())
      .nullable()
      .optional(),
    page: z
      .lazy(() => Page.nullable().optional())
      .nullable()
      .optional(),
    pageId: z.string().nullable().optional(),
    address: z
      .lazy(() => Address.nullable().optional())
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
    tags: z
      .lazy(() => Tag.array().nullable().optional())
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
    postHistory: z
      .lazy(() => PostHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    postHistory: true,
  });

// Comment Schema
export const Comment = z
  .object({
    id: z.string().nullable().optional(),
    text: z.string().nullable().optional(),
    media: z.any().nullable().optional(), // JSON field

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    authorId: z.string().nullable().optional(),
    postId: z.string().nullable().optional(),
    parentId: z.string().nullable().optional(),

    author: z
      .lazy(() => User.nullable().optional())
      .nullable()
      .optional(),
    post: z
      .lazy(() => Post.nullable().optional())
      .nullable()
      .optional(),
    parent: z
      .lazy(() => Comment.nullable().optional())
      .nullable()
      .optional(),

    replies: z
      .lazy(() => Comment.array().nullable().optional())
      .nullable()
      .optional(),
    reactions: z
      .lazy(() => Reaction.array().nullable().optional())
      .nullable()
      .optional(),
    tags: z
      .lazy(() => Tag.array().nullable().optional())
      .nullable()
      .optional(),
    reports: z
      .lazy(() => Report.array().nullable().optional())
      .nullable()
      .optional(),
    commentHistory: z
      .lazy(() => CommentHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    commentHistory: true,
  });

// Reaction Schema
export const Reaction = z
  .object({
    id: z.string().nullable().optional(),
    emoji: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    userId: z.string().nullable().optional(),
    user: z
      .lazy(() => User.nullable().optional())
      .nullable()
      .optional(),
    postId: z.string().nullable().optional(),
    post: z
      .lazy(() => Post.nullable().optional())
      .nullable()
      .optional(),
    commentId: z.string().nullable().optional(),
    comment: z
      .lazy(() => Comment.nullable().optional())
      .nullable()
      .optional(),

    reactionHistory: z
      .lazy(() => ReactionHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    reactionHistory: true,
  });

// Bookmark Schema
export const Bookmark = z
  .object({
    id: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    user: z
      .lazy(() => User.nullable().optional())
      .nullable()
      .optional(),
    userId: z.string().nullable().optional(),
    post: z
      .lazy(() => Post.nullable().optional())
      .nullable()
      .optional(),
    postId: z.string().nullable().optional(),

    bookmarkHistory: z
      .lazy(() => BookmarkHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    bookmarkHistory: true,
  });

// Post History Schema
export const PostHistory = z.object({
  id: z.string().nullable().optional(),
  postId: z.string().nullable().optional(),
  text: z.string().nullable().optional(),
  media: z.any().nullable().optional(),
  isPinned: z.boolean().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  groupId: z.string().nullable().optional(),
  pageId: z.string().nullable().optional(),

  post: z
    .lazy(() => Post.nullable().optional())
    .nullable()
    .optional(),
});

// Comment History Schema
export const CommentHistory = z.object({
  id: z.string().nullable().optional(),
  commentId: z.string().nullable().optional(),
  text: z.string().nullable().optional(),
  media: z.any().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  authorId: z.string().nullable().optional(),
  postId: z.string().nullable().optional(),
  parentId: z.string().nullable().optional(),

  comment: z
    .lazy(() => Comment.nullable().optional())
    .nullable()
    .optional(),
});

// Reaction History Schema
export const ReactionHistory = z.object({
  id: z.string().nullable().optional(),
  reactionId: z.string().nullable().optional(),
  emoji: z.string().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  userId: z.string().nullable().optional(),
  postId: z.string().nullable().optional(),
  commentId: z.string().nullable().optional(),

  reaction: z
    .lazy(() => Reaction.nullable().optional())
    .nullable()
    .optional(),
});

// Bookmark History Schema
export const BookmarkHistory = z.object({
  id: z.string().nullable().optional(),
  bookmarkId: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
  postId: z.string().nullable().optional(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),

  bookmark: z
    .lazy(() => Bookmark.nullable().optional())
    .nullable()
    .optional(),
});

// Define types based on schemas
export type Post = z.infer<typeof Post>;
export type Comment = z.infer<typeof Comment>;
export type Reaction = z.infer<typeof Reaction>;
export type Bookmark = z.infer<typeof Bookmark>;
export type PostHistory = z.infer<typeof PostHistory>;
export type CommentHistory = z.infer<typeof CommentHistory>;
export type ReactionHistory = z.infer<typeof ReactionHistory>;
export type BookmarkHistory = z.infer<typeof BookmarkHistory>;
