"use client";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { useContext, useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { ProductSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DatePicker } from "../DatePicker";
import { addEntree, editEntree } from "@/actions/Entree";
import { NotificationContext } from "@/context/NotificationContext";
import { TriggerContext } from "@/context/TriggerContext";
import { operation } from "../opertaionOverview/OperationOverview";

interface props {
  edit: boolean;
  operation: operation;
}

export const AddEditAchat = (props: props) => {
  const { edit, operation } = props;
  const { setError, setSuccess, notificationToggle } =
    useContext(NotificationContext);
  const { triggerToggle } = useContext(TriggerContext);

  const [date, setDate] = useState<Date>(edit ? operation.date : new Date());
  const [isPending, startTransition] = useTransition();
  const [category, setcategory] = useState<string | undefined>();
  const { toggle } = useContext(AddEditModalContext);
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: edit ? operation.article : "",
      ref: edit ? operation.ref.toString() : "",
      quantity: edit ? operation.quantity.toString() : "",
    },
  });

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    setError("");
    setSuccess("");
    if (!category) return;
    startTransition(() => {
      edit
        ? editEntree(values, category!, date, operation.id).then((data) => {
            setError(data?.error);
            setSuccess(data?.success);
          })
        : addEntree(values, category!, date).then((data) => {
            setError(data?.error);
            setSuccess(data?.success);
          });

      triggerToggle();
      toggle();
      notificationToggle();
    });
  };

  return (
    <>
      <div
        onClick={toggle}
        className="w-full top-0 left-0 h-full fixed bg-background/70 z-10  "
      ></div>
      <div className="bg-dark w-[610px]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-10 shadow-md z-20   ">
        <div className="text-2xl font-bold mb-10 text-white">
          {edit ? "Modifier L'Achat" : "Ajouter un Achat "}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center gap-x-2 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-white w-full"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ref"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ref</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-white"
                        placeholder="Ref"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-white"
                        placeholder="Quantity"
                        type="number"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-x-2">
              <Select
                defaultValue={edit ? operation.category : ""}
                disabled={isPending}
                onValueChange={(value) => setcategory(value)}
              >
                <SelectTrigger className="w-full h-11 bg-Slate-Teal border-none text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-Slate-Teal text-white border-none">
                  <SelectItem value="test 1">1</SelectItem>
                  <SelectItem value="test 2">2</SelectItem>
                  <SelectItem value="test 3">3</SelectItem>
                </SelectContent>
              </Select>

              <DatePicker date={date} setDate={setDate} />
            </div>
            <div className="flex items-center justify-end gap-x-4">
              <Button
                disabled={isPending}
                type="button"
                onClick={toggle}
                variant={"secondary"}
                size={"lg"}
              >
                Anuuler
              </Button>
              <Button disabled={isPending} type="submit" size={"lg"}>
                {edit ? "Modifier" : "Ajouter"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
