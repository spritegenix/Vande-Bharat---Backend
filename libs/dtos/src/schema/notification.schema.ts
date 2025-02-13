import { z } from 'zod';
import { User } from './user.schema';

// Define Enum Separately
export const NotificationType = z
  .enum(['SYSTEM', 'COMMENT', 'REACTION', 'FOLLOW', 'ORDER_UPDATE'])
  .nullable()
  .optional();
export type NotificationType = z.infer<typeof NotificationType>;

// Notification Schema
export const Notification = z
  .object({
    id: z.string().nullable().optional(),
    type: NotificationType.nullable().optional(),
    message: z.string().nullable().optional(),
    readAt: z.date().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    userId: z.string().nullable().optional(),

    user: z
      .lazy(() => User.nullable().optional())
      .nullable()
      .optional(),
    notificationHistory: z
      .lazy(() => NotificationHistory.array().nullable().optional())
      .nullable()
      .optional(),
  })
  .omit({
    notificationHistory: true,
  })
  .nullable()
  .optional();

// Notification History Schema
export const NotificationHistory = z
  .object({
    id: z.string().nullable().optional(),
    notificationId: z.string().nullable().optional(),
    type: NotificationType.nullable().optional(),
    message: z.string().nullable().optional(),
    readAt: z.date().nullable().optional(),

    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),

    userId: z.string().nullable().optional(),
    notification: z
      .lazy(() => Notification.nullable().optional())
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

// Define types based on schemas
export type Notification = z.infer<typeof Notification>;
export type NotificationHistory = z.infer<typeof NotificationHistory>;
