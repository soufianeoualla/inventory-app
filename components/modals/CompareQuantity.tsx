"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useContext, useState, useTransition } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { article } from "@prisma/client";
import { Label } from "../ui/label";
import { FormError } from "../auth/FormError";
import { FormSuccess } from "../auth/FormSuccess";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { compareQuantity } from "@/actions/compareQuantity";

interface Props {
  articles: article[];
  id: string;
}

export const CompareQuantity = ({ articles, id }: Props) => {
  const { toggle } = useContext(AddEditModalContext);

  const [quantity, setQuantity] = useState<string>("");
  const [selectedName, setselectedName] = useState<string>("");
  const [selectedRef, setselectedRef] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [error, seterror] = useState<string | undefined>("");
  const [success, setsuccess] = useState<string | undefined>("");

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      if (!quantity || !selectedRef) return;
      compareQuantity(selectedRef, id, quantity).then((data) => {
        seterror(data?.error);
        setsuccess(data?.success);
      });
    });
  };

  return (
    <>
      <div
        onClick={toggle}
        className="w-full top-0 left-0 h-full fixed bg-background/80 z-10  "
      ></div>
      <Card className="bg-dark w-[400px] sm:w-[95%] border-none  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-4 shadow-md z-20">
        <CardHeader className="text-2xl font-bold">
          Comparaison d&apos;inventaire
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="flex items-start gap-x-2">
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
                    {articles?.map((item, index) => (
                      <SelectItem key={index} value={item.ref.toString()}>
                        {item.ref}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                    {articles?.map((item, index) => (
                      <SelectItem key={index} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Input
              type="number"
              placeholder="Quantity"
              value={quantity}
              disabled={isPending}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
            <Button disabled={isPending} size={"lg"}>
              Comparer
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
