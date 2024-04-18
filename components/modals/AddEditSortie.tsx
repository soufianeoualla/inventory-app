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
import { DatePicker } from "../DatePicker";
import { NotificationContext } from "@/context/NotificationContext";
import { getArticles, getInventories } from "@/data/inventory";
import { Label } from "../ui/label";
import { addSortie, editSortie } from "@/actions/sortie";
import { TriggerContext } from "@/context/TriggerContext";
import { FormError } from "../auth/FormError";
import { Inventories } from "../inventory/InventoryList";
import Link from "next/link";
import { article, sortie } from "@prisma/client";


interface props {
  edit: boolean;
  operation: sortie | undefined;
}

export const AddEditSortie = ({ edit, operation }: props) => {
  const [names, setnames] = useState<Array<string> | undefined>();
  const [ref, setref] = useState<Array<string> | null>();
  const [articles, setarticles] = useState<article[] | null>();
  const [selectedName, setselectedName] = useState<string>(
    edit ? operation!.article : ""
  );
  const [selectedRef, setselectedRef] = useState<string>(
    edit ? operation!.ref.toString() : ""
  );
  const [inventoryId, setinventoryId] = useState<string>("");
  const [inventories, setinventories] = useState<Inventories[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getInventories();
      setinventories(response);
      const res = await getArticles(inventoryId);
      setarticles(res);
      setnames(res?.map((item) => item.name));
      setref(res?.map((item) => item.ref.toString()));
    };
    getData();
  }, [inventoryId]);

  const { setError, setSuccess, notificationToggle, success, error } =
    useContext(NotificationContext);
  const { triggerToggle } = useContext(TriggerContext);

  const [date, setDate] = useState<Date>(edit ? operation!.date : new Date());
  const [isPending, startTransition] = useTransition();
  const { toggle } = useContext(AddEditModalContext);
  const [quantity, setquantity] = useState<string>(
    edit ? operation!.quantity.toString() : ""
  );

  const handleNameChange = (value: string) => {
    setselectedName(value);
    const dependRef = articles?.filter((item) => item.name === value);
    if (dependRef && dependRef.length > 0) {
      setselectedRef(dependRef[0].ref.toString());
    }
  };

  const handleRefChange = (value: string) => {
    setselectedRef(value);
    const dependName = articles?.find((item) => item.ref.toString() === value);
    if (dependName) {
      setselectedName(dependName.name);
    }
  };

  const onAddSortie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!selectedName || !selectedRef) return;
    const sortieValues = { selectedName, selectedRef, quantity, date };
    startTransition(() => {
      edit
        ? editSortie(sortieValues, operation!.id).then((data) => {
            setError(data.error);
            setSuccess(data.success);
          })
        : addSortie(sortieValues,inventoryId).then((data) => {
            setError(data.error);
            setSuccess(data.success);
          });

      toggle();
      notificationToggle();
      triggerToggle();
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
          {"Ajouter un sortie"}
        </div>

        <form onSubmit={onAddSortie} className="space-y-8">
          <div className="flex items-end gap-x-2">
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
                      {"vous n'avez pas d'inventaire,"}
                      <Link href={"/inventaire"}>créez-en un</Link>
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
            <div className="w-full space-y-2">
              <Label>Date</Label>
              <DatePicker date={date} setDate={setDate} />
            </div>
          </div>
          <div className="flex items-center gap-x-2 ">
            <div className=" w-full space-y-2">
              <Label>Name</Label>
              <Select
                value={selectedName}
                disabled={isPending}
                onValueChange={(value) => handleNameChange(value)}
              >
                <SelectTrigger className="w-full h-11 bg-Slate-Teal border-none text-white">
                  <SelectValue placeholder="Name" />
                </SelectTrigger>
                <SelectContent className="bg-Slate-Teal text-white border-none">
                  {names?.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full space-y-2">
              <Label> Ref</Label>
              <Select
                value={selectedRef}
                disabled={isPending}
                onValueChange={(value) => handleRefChange(value)}
              >
                <SelectTrigger className="w-full h-11 bg-Slate-Teal border-none text-white">
                  <SelectValue placeholder="Ref" />
                </SelectTrigger>
                <SelectContent className="bg-Slate-Teal text-white border-none">
                  {ref?.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 w-full">
              <Label>Quantity</Label>
              <Input
                className="text-white"
                type="number"
                placeholder="Quantity"
                onChange={(e) => setquantity(e.target.value)}
              />
            </div>
          </div>

          {error && <FormError message={error} />}
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
              Ajouter
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
