import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const userRegisterSchema = userAuthSchema
  .extend({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters",
    }),
    confirmPassword: z
      .string()
      .min(3, "Confirm password must be at least 3 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type AuthUsers = z.infer<typeof userAuthSchema>;
export type RegisterUser = z.infer<typeof userRegisterSchema>;
