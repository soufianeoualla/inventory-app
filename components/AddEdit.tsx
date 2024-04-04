"use client";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { useContext } from "react";
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
import { useForm } from "react-hook-form";
import { ProductSchema } from "@/schemas";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface AddEditProp {
  type: string;
}

export const AddEdit = ({ type }: AddEditProp) => {
  const { toggle } = useContext(AddEditModalContext);
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      code: "",
      price: "",
      quantity: "",
    },
  });

  return (
    <>
      <div
        onClick={toggle}
        className="w-full top-0 left-0 h-full fixed bg-background/70 z-10  "
      ></div>
      <div className="bg-dark w-[610px] h-screen absolute top-0 left-[250px] rounded-r-2xl p-14 shadow-md z-20 overflow-y-scroll  ">
        <div className="text-2xl font-bold mb-20 text-white">
          {type === "sortie" ? "Ajouter un sortie" : "Ajouter un Achat"}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Code" {...field} />
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
                    <Input placeholder="Quantity" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-x-4">
              <Button
                type="button"
                onClick={toggle}
                variant={"secondary"}
                size={"lg"}
              >
                Anuuler
              </Button>
              <Button type="submit" size={"lg"}>
                Ajouter
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
