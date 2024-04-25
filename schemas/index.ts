import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom est requis",
  }),
  ref: z.string().min(2, {
    message: "La référence est requise",
  }),
  quantity: z.string().min(1, {
    message: "La quantité est requise",
  }),
  category: z.string().min(2, {
    message: "La catégorie est requise",
  }),
  unitPrice: z.string().min(1, {
    message: "Le prix unitaire est requis",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "L'e-mail est requis",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe est requis",
  }),
});
export const ForgotPsswordSchema = z.object({
  email: z.string().email({
    message: "L'e-mail est requis",
  }),
});
export const AdduserSchema = z.object({
  name: z.string().min(3, {
    message: "Le nom complet est requis",
  }),

  email: z.string().email({
    message: "L'e-mail est requis",
  }),
});
export const changeNameEmailSchema = z.object({
  name: z.string().min(3, {
    message: "Le nom complet est requis",
  }),

  email: z.string().email({
    message: "L'e-mail est requis",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(3, {
    message: "Le nom complet est requis",
  }),
  company: z.string().min(3, {
    message: "La société est requise",
  }),
  email: z.string().email({
    message: "L'e-mail est requis",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe est requis",
  }),
});

export const NewPasswordSchema = z.object({
  oldPassword: z.string().min(6, {
    message: "Le mot de passe est requis",
  }),
  newPassword: z.string().min(6, {
    message: "Le mot de passe est requis",
  }),
});

export const ResetSchema = z
  .object({
    password: z.string().min(6, {
      message: "Le mot de passe est requis",
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Les mots de passe doivent correspondre !",
      path: ["confirmPassword"],
    }
  );
