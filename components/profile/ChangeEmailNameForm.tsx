"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useContext, useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "../auth/FormError";
import { FormSuccess } from "../auth/FormSuccess";
import { changeNameEmailSchema } from "@/schemas";
import { AddImage, changeNameEmail } from "@/actions/profile";
import { Label } from "../ui/label";
import { useEdgeStore } from "@/lib/edgestore";
import { TriggerContext } from "@/context/TriggerContext";

interface User {
  name: string | null;
  email: string | null;
}

export const ChangeEmailNameForm = ({ email, name }: User) => {
  const { triggerToggle } = useContext(TriggerContext);

  const [isPending, startTransition] = useTransition();
  const [file, setfile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [error, seterror] = useState<string | undefined>();
  const [success, setsuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof changeNameEmailSchema>>({
    resolver: zodResolver(changeNameEmailSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const onSave = () => {
    const values = form.getValues();
    startTransition(() => {
      changeNameEmail(values).then((data) => {
        seterror(data?.error);
        setsuccess(data?.success);
      });
    });
    triggerToggle();
  };

  const handleUpload = () => {
    if (!file) return seterror("Please select an image");
    startTransition(async () => {
      const res = await edgestore.publicFiles.upload({
        file,
      });
      AddImage(res.url).then((data) => {
        seterror(data?.error);
        setsuccess(data?.success);
      });
    });
    triggerToggle();
  };

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5 space-y-4">
        <div className="space-y-2 items-end">
          <div className="space-y-2">
            <Label htmlFor="picture">Image</Label>
            <Input
              disabled={isPending}
              placeholder="Selectionner une image"
              id="picture"
              type="file"
              onChange={(e) => {
                setfile(e.target.files?.[0]);
              }}
              className=" h-10 pt-2 flex justify-center items-center placeholder:text-white  cursor-pointer  :"
            />
          </div>

          <Button disabled={isPending} onClick={handleUpload} type="button">
          Télécharger
          </Button>
        </div>
      </div>{" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder={name as string}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder={email as string}
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="mt-8">
          Sauvegarder les modifications
          </Button>
        </form>
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
      </Form>
    </>
  );
};
