"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";

import { useRouter } from "next/navigation";
import { changePassword } from "@/actions/resetPssword";

interface ResetPasswordProps{
  token: string
}

export const ResetPassword = ({token}:ResetPasswordProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const router = useRouter();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onChange = (values: z.infer<typeof ResetSchema>) => {
    startTransition(() => {
      if (!token) return setError("Missing Token");
      changePassword(token, values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
  
        if (data?.success) {
          setTimeout(() => {
            setSuccess("Redirecting...");
            setTimeout(() => {
              router.push("/auth/login");
            }, 3000); 
          }, 2000); 
        }
      });
    });
  };
  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onChange)}
        className="space-y-8 text-left"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="password"
                  placeholder="******"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="password"
                  placeholder="******"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormError message={error} />}{" "}
        {success && <FormSuccess message={success} />}
        <Button
          disabled={isPending}
          size={"lg"}
          type="submit"
          className="w-full"
        >
          Modifier le mot de passe
        </Button>
      </form>
    </Form>
  );
};