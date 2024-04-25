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
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import Link from "next/link";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onLogin)}
        className="space-y-6 text-left"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="email"
                  placeholder="mail@soufian.me"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="password"
                  placeholder="******"
                  {...field}
                />
              </FormControl>
              <Button
                size={"sm"}
                asChild
                variant={"link"}
                className="px-0 font-normal focus:text-light-purple"
              >
                <Link href={"/auth/reset"}>{"Mot de passe oublié ?"}</Link>
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormError message={error} />}{" "}
        {success && <FormSuccess message={success} />}{" "}
        <Button
          disabled={isPending}
          size={"lg"}
          type="submit"
          className="w-full"
        >
          Connexion
        </Button>
      </form>
    </Form>
  );
};