import { z } from "zod";

/** Auth User */
export const authSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  confirmed: z.boolean(),
  token: z.string(),
});

export type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "email" | "name" | "password" | "password_confirmation"
>;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ConfirmToken = Pick<Auth, "token">;
export type ResetPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;
export type SetPassword = Pick<
  Auth,
  "password" | "password_confirmation" | "token"
>;

/** Task */
export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);

export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;

/** Projects */
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
);

export const editProjectSchema = projectSchema.extend({
  tasks: z.array(taskSchema),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  "projectName" | "clientName" | "description"
>;
