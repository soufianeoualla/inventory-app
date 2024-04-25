"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {  useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPasswordSchema } from "@/schemas";
import { makeNewPssword } from "@/actions/profile";
import { FormError } from "../auth/FormError";
import { FormSuccess } from "../auth/FormSuccess";

export const ChangePasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, seterror] = useState<string | undefined>();
  const [success, setsuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
    },
  });

  const onSave = (values: z.infer<typeof NewPasswordSchema>) => {
    startTransition(() => {
      makeNewPssword(values).then((data) => {
        seterror(data?.error);
        setsuccess(data?.success);
      });
    });
  };

  return (
    <Form {...form}>
  <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
    <FormField
      control={form.control}
      name="oldPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Mot de passe actuel</FormLabel>
          <FormControl>
            <Input
              disabled={isPending}
              placeholder=""
              type="password"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="newPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nouveau mot de passe</FormLabel>
          <FormControl>
            <Input
              disabled={isPending}
              placeholder=""
              type="password"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    {error && <FormError message={error} />}
    {success && <FormSuccess message={success} />}
    <Button disabled={isPending} className="mt-8">
      Enregistrer le mot de passe
    </Button>
  </form>
</Form>

  );
};
