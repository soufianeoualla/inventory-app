"use client";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { useContext, useEffect, useState, useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { NotificationContext } from "@/context/NotificationContext";
import { Label } from "../ui/label";
import { TriggerContext } from "@/context/TriggerContext";

import { addInventaire, editInventaire } from "@/actions/Inventaire";
import { getInventory } from "@/data/inventory";
import { inventory } from "@prisma/client";

interface AddInventoryProps {
  id?: string;
  edit?: boolean;
}

export const AddInventory = ({ id, edit }: AddInventoryProps) => {
  const methods = ["CMUP"];
  const [inventory, setInventory] = useState<inventory | null>();
  const [selectedMethod, setselectedMethod] = useState<string | undefined>(
    edit ? inventory?.method : ""
  );
  const [name, setname] = useState<string | undefined>(
    edit ? inventory?.name : ""
  );
  const [isPending, startTransition] = useTransition();
  const { toggle } = useContext(AddEditModalContext);
  const { setError, setSuccess, notificationToggle } =
    useContext(NotificationContext);
  const { triggerToggle } = useContext(TriggerContext);

  useEffect(() => {
    const getData = async () => {
      const data = await getInventory(id!);
      setInventory(data);
    };
    getData();
  }, [id]);
  console.log(id)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !selectedMethod) return;
    startTransition(() => {
      edit
        ? editInventaire(name, selectedMethod, id!).then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        : addInventaire(name, selectedMethod).then((data) => {
            setError(data.error);
            setSuccess(data.success);
          });
      notificationToggle();
      toggle();
      triggerToggle();
    });
  };
  return (
    <>
      <div
        onClick={toggle}
        className="w-full top-0 left-0 h-full fixed bg-background/70 z-10  "
      ></div>
      <div className="bg-dark max-w-[610px] sm:w-[95%]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-10 shadow-md z-20   ">
        <div className="text-2xl font-bold mb-10 text-white">
          {edit ? "Modifier L'inventaire" : "Ajouter un Inventaire"}
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-2 w-full">
            <Label>Nom</Label>
            <Input
              className="text-white"
              type="text"
              placeholder="Nom"
              disabled={isPending}
              defaultValue={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div className=" w-full space-y-2">
            <Label>Méthod</Label>
            <Select
              value={selectedMethod}
              disabled={isPending}
              onValueChange={(value) => setselectedMethod(value)}
            >
              <SelectTrigger className="w-full h-11 bg-Slate-Teal border-none text-white">
                <SelectValue placeholder="Méthod" />
              </SelectTrigger>
              <SelectContent className="bg-Slate-Teal text-white border-none">
                {methods?.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
      </div>
    </>
  );
};
