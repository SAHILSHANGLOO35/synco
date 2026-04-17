import { z } from "zod"

export const SignupSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(20, { message: "Username cannot exceed 20 characters" })
    .regex(/^[a-zA-Z0-9_ ]+$/, {
      message:
        "Username can only contain letters, numbers, underscores, and spaces",
    }),

  email: z.email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password is too long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character (@$!%*?&)",
    }),
})

export const SigninSchema = SignupSchema.pick({
  email: true,
  password: true,
})

export const syncCreateSchema = z.object({
  availableTriggerId: z
    .string()
    .min(1, { message: "Trigger ID is required" })
    .uuid({ message: "Invalid trigger ID format" }),

  triggerMetadata: z
    .record(z.string(), z.unknown()) // object with key-value pairs
    .optional(),

  actions: z
    .array(
      z.object({
        availableActionId: z
          .string()
          .min(1, { message: "Action ID is required" })
          .uuid({ message: "Invalid action ID format" }),

        actionMetadata: z.record(z.string(), z.unknown()).optional(),
      })
    )
    .min(1, { message: "At least one action is required" }),
})
