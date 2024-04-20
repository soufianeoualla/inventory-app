"use client";
import { useContext, useEffect, useState } from "react";
import { Filters } from "./Filters";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa6";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { AddEditAchat } from "./modals/AddEditAchat";
import { Items } from "./Items";
import { PopUpMessage } from "./modals/PopUpMessage";
import { NotificationContext } from "@/context/NotificationContext";
import { getEntree } from "@/data/entree";
import { getSortie } from "@/data/sortie";
import { TriggerContext } from "@/context/TriggerContext";
import { usePathname } from "next/navigation";
import { AddEditSortie } from "./modals/AddEditSortie";
import { DateRange } from "react-day-picker";
import { addDays, subDays } from "date-fns";
import { DateRangeFilter } from "./DateRangeFilter";
import { getInventories } from "@/data/inventory";
import { Inventories } from "./inventory/InventoryList";
import { getSession } from "next-auth/react";
import { User } from "next-auth";
import { operation } from "@prisma/client";

export const PageWrapper = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 15),
    to: addDays(new Date(), 7),
  });

  const { notification } = useContext(NotificationContext);
  const { toggle, addEditModal, settype, type } =
    useContext(AddEditModalContext);
  const [items, setitems] = useState<operation[] | null>();
  const [category, setcategory] = useState<string>("");
  const { trigger } = useContext(TriggerContext);
  const pathname = usePathname();
  const [inventories, setinventories] = useState<Inventories[] | null>(null);
  const [inventoryId, setinventoryId] = useState<string>("");
  const [user, setuser] = useState<User | null>();

  useEffect(() => {
    const getdata = async () => {
      const session = await getSession();
      setuser(session?.user);
      const res = pathname.includes("achat")
        ? await getEntree()
        : await getSortie();
      setitems(res);
      const response = await getInventories();
      setinventories(response);
    };
    getdata();
  }, [trigger, pathname]);
  const categories = items?.map((item) => item.category);
  const uniqueCategoriesSet = new Set(categories);
  const uniqueCategories: string[] = [];

  uniqueCategoriesSet.forEach((category) => {
    uniqueCategories.push(category);
  });

  const filtredItemsByCategory = items?.filter((item) => {
    if (category && category !== "all") {
      return item.category === category;
    }
    return true;
  });

  const filtredItemsByInventory = filtredItemsByCategory?.filter((item) => {
    if (inventoryId && inventoryId !== "all") {
      return item.inventoryId === inventoryId;
    }
    return true;
  });

  const filtredItemsByTime = filtredItemsByInventory?.filter((item) => {
    const itemDate = new Date(item.date);
    const fromDate = date?.from ? new Date(date.from) : null;
    const toDate = date?.to ? new Date(date.to) : null;

    if (fromDate && toDate) {
      return (
        itemDate.getFullYear() >= fromDate.getFullYear() &&
        itemDate.getMonth() >= fromDate.getMonth() &&
        itemDate.getDate() >= fromDate.getDate() &&
        itemDate.getFullYear() <= toDate.getFullYear() &&
        itemDate.getMonth() <= toDate.getMonth() &&
        itemDate.getDate() <= toDate.getDate()
      );
    } else if (fromDate && !toDate) {
      return (
        itemDate.getFullYear() === fromDate.getFullYear() &&
        itemDate.getMonth() === fromDate.getMonth() &&
        itemDate.getDate() === fromDate.getDate()
      );
    } else {
      return true;
    }
  });

  return (
    <>
      <div className="w-[900px] mx-auto space-y-16">
        <div className="flex justify-end items-center gap-x-4">
          <DateRangeFilter
            date={date}
            setDate={setDate}
            className={undefined}
          />
          <Filters
            uniqueCategories={uniqueCategories}
            setcategory={setcategory}
            inventories={inventories}
            setinventoryId={setinventoryId}
          />

          {user?.role !== "user" && pathname.includes("achat") ? (
            <Button
              onClick={() => {
                toggle();
                settype("entree");
              }}
              className="flex items-center gap-x-2 font-bold"
            >
              <FaPlus />
              Ajouter un Entrée
            </Button>
          ) : (
            <Button
              onClick={() => {
                toggle();
                settype("sortie");
              }}
              className="flex items-center gap-x-2 font-bold"
            >
              <FaPlus />
              Ajouter un Sortie
            </Button>
          )}
        </div>
        <Items type="achat" items={filtredItemsByTime} />
      </div>

      {addEditModal && type === "entree" && (
        <AddEditAchat edit={false} operation={undefined} />
      )}
      {addEditModal && type === "sortie" && (
        <AddEditSortie edit={false} operation={undefined} />
      )}
      {notification && <PopUpMessage />}
    </>
  );
};
