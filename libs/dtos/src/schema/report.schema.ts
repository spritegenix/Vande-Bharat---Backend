import { z } from 'zod';
import { User } from './user.schema';
import { Page } from './page.schema';
import { Group } from './group.schema';
import { Comment, Post } from './post.schema';

// Report Schema
export const Report = z
  .object({
    id: z.string().nullable().optional(),
    message: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    type: z
      .lazy(() => ReportType.nullable().optional())
      .nullable()
      .optional(),
    reportTypeId: z.string().nullable().optional(),

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
    groupId: z.string().nullable().optional(),
    group: z
      .lazy(() => Group.nullable().optional())
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

    reportHistory: z
      .lazy(() => ReportHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    reportHistory: true,
  })
  .nullable()
  .optional();

// Report Type Schema
export const ReportType = z
  .object({
    id: z.string().nullable().optional(),
    name: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    reports: z
      .lazy(() => Report.array().nullable().optional())
      .nullable()
      .optional(),
    reportTypeHistory: z
      .lazy(() => ReportTypeHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    reportTypeHistory: true,
  })
  .nullable()
  .optional();

// Report History Schema
export const ReportHistory = z
  .object({
    id: z.string().nullable().optional(),
    reportId: z.string().nullable().optional(),
    message: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    reportTypeId: z.string().nullable().optional(),
    userId: z.string().nullable().optional(),
    pageId: z.string().nullable().optional(),
    groupId: z.string().nullable().optional(),
    postId: z.string().nullable().optional(),
    commentId: z.string().nullable().optional(),

    report: z
      .lazy(() => Report.nullable().optional())
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

// Report Type History Schema
export const ReportTypeHistory = z
  .object({
    id: z.string().nullable().optional(),
    reportTypeId: z.string().nullable().optional(),
    name: z.string().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    reportType: z
      .lazy(() => ReportType.nullable().optional())
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

// Define types based on schemas
export type Report = z.infer<typeof Report>;
export type ReportType = z.infer<typeof ReportType>;
export type ReportHistory = z.infer<typeof ReportHistory>;
export type ReportTypeHistory = z.infer<typeof ReportTypeHistory>;
