"use client";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { useContext, useEffect, useState, useTransition } from "react";
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
import { Label } from "../ui/label";
import { getArticleByRef, getInventories } from "@/data/inventory";
import { Inventories } from "../inventory/InventoryList";
import { operation } from "@prisma/client";
import { FormError } from "../auth/FormError";

interface props {
  edit: boolean;
  operation: operation | undefined;
}

export const AddEditAchat = (props: props) => {
  const { edit, operation } = props;
  const { setError, setSuccess, notificationToggle, error, success } =
    useContext(NotificationContext);
  const { triggerToggle } = useContext(TriggerContext);
  const [inventoryId, setinventoryId] = useState<string>(
    edit ? operation!.inventoryId : ""
  );
  const [date, setDate] = useState<Date>(edit ? operation!.date : new Date());
  const [inventories, setinventories] = useState<Inventories[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toggle } = useContext(AddEditModalContext);
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: edit ? operation!.article : "",
      ref: edit ? operation!.ref.toString() : "",
      quantity: edit ? operation!.quantity.toString() : "",
      category: edit ? operation?.category : "",
      unitPrice: edit ? operation?.price.toString() : "",
    },
  });
  const { watch } = form;

  const selectedRef = watch("ref");

  useEffect(() => {
    const getData = async () => {
      const response = await getInventories();
      setinventories(response);
      if (selectedRef) {
        const articleData = await getArticleByRef(parseInt(selectedRef));
        form.setValue("name", articleData?.name || "");
        form.setValue("category", articleData?.category || "");
      }
    };
    getData();
  }, [selectedRef, form]);

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    if (!inventoryId)
      return setError("sélectionnez un inventaire s'il vous plaît");
    setError("");
    setSuccess("");
    startTransition(() => {
      edit
        ? editEntree(values, date, operation!.id).then((data) => {
            setError(data?.error);
            setSuccess(data?.success);
          })
        : addEntree(values, date, inventoryId).then((data) => {
            setError(data?.error);
            setSuccess(data?.success);
          });

      triggerToggle();
      notificationToggle();
      toggle();
    });
  };

  return (
    <>
      <div
        onClick={toggle}
        className="w-full top-0 left-0 h-full fixed bg-background/70 z-10  "
      ></div>
      <div className="bg-dark w-[610px] sm:w-[95%]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-10 sm:px-6  shadow-md z-20   ">
        <div className="text-2xl font-bold mb-10 text-white">
          {edit ? "Modifier L'Entrée" : "Ajouter une Entrée "}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-start gap-x-2  ">
              <FormField
                control={form.control}
                name="ref"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Réf</FormLabel>
                    <FormControl>
                      <Input
                        list="ref-list"
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-white w-full"
                        placeholder="Article"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-white w-full"
                        placeholder="Catégorie"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 items-end gap-x-2 space-y-6 mb-4">
              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix Unitaire</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-white w-full"
                        placeholder="P.U"
                        type="number"
                        min={0}
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
                    <FormLabel>Quantité</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-white"
                        placeholder="Quantity"
                        type="number"
                        {...field}
                        min={0}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className=" w-full space-y-2">
                <Label>Inventaire</Label>
                <Select
                  value={inventoryId}
                  disabled={isPending}
                  onValueChange={(value) => setinventoryId(value)}
                >
                  <SelectTrigger className="w-full h-11 bg-Slate-Teal border-none text-white">
                    <SelectValue placeholder="Inventaire" />
                  </SelectTrigger>
                  <SelectContent className="bg-Slate-Teal text-white border-none">
                    {inventories?.length === 0 && (
                      <SelectItem disabled value={" "}>
                        {"vous n'avez pas d'inventaire, créez-en un"}
                      </SelectItem>
                    )}
                    {inventories?.map((item, index) => (
                      <SelectItem key={index} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-full">
                <Label>Date</Label>
                <DatePicker date={date} setDate={setDate} />
              </div>
            </div>
            {error && <FormError message={error} />}

            <div className="flex items-center justify-end gap-x-4 mt-6 sm:mt-10">
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
