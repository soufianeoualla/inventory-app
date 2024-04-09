import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  code: z.string().min(2, {
    message: "Code must be at least 2 characters.",
  }),
  quantity: z.string().min(2, {
    message: "Quantity is Required",
  }),
  price: z.string().min(1, {
    message: "Price is Required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is Required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});
export const ForgotPsswordSchema = z.object({
  email: z.string().email({
    message: "Email is Required",
  }),
});
export const AdduserSchema = z.object({
  name: z.string().min(3, {
    message: "Full Name is Required",
  }),

  email: z.string().email({
    message: "Email is Required",
  }),
});
export const changeNameEmailSchema = z.object({
  name: z.string().min(3, {
    message: "Full Name is Required",
  }),

  email: z.string().email({
    message: "Email is Required",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(3, {
    message: "Full Name is Required",
  }),
  company: z.string().min(3, {
    message: "Company is Required",
  }),
  email: z.string().email({
    message: "Email is Required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

export const NewPasswordSchema = z.object({
  oldPassword: z.string().min(6, {
    message: "Password is required",
  }),
  newPassword: z.string().min(6, {
    message: "Password is required",
  }),
});

export const ResetSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password is required",
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );
