import { Resend } from "resend";
import { ResetPasswordEmail } from "@/emails/ResetPassword";
import { WelcomeEmail } from "@/emails/WelcomeVerification";
import Adduser from "@/emails/AddUser";


const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const confirmationLink = `${domain}/auth/verification?token=${token}`;

  await resend.emails.send({
    from: "mail@soufian.me",
    to: email,
    subject: "Confirm your email",
    react: WelcomeEmail({
      userFirstname: name,
      confirmationLink: confirmationLink,
    }),
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const confirmationLink = `${domain}/auth/reset?token=${token}`;

  await resend.emails.send({
    from: "mail@soufian.me",
    to: email,
    subject: "Reset your password",
    react: ResetPasswordEmail({
      userFirstname: name,
      resetPasswordLink: confirmationLink,
    }),
  });
};

export const AddUserEmail = async (email: string, name: string, passwod: string) => {
  await resend.emails.send({
    from: "mail@soufian.me",
    to: email,
    subject: "Reset your password",
    react: Adduser({
      passwod: passwod,
      userFirstname: name,
      email: email,
    }),
  });
};
