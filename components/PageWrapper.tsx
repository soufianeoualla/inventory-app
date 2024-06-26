"use client";
import { Suspense, useContext, useEffect, useState } from "react";
import { Filters } from "./Filters";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa6";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { AddEditAchat } from "./modals/AddEditAchat";
import { Items } from "./Items";
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

import { operation } from "@prisma/client";
import { UserContext } from "@/context/UserContext";

export const PageWrapper = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: addDays(new Date(), 7),
  });
  const { user } = useContext(UserContext);
  const { toggle, addEditModal, settype, type } =
    useContext(AddEditModalContext);
  const [items, setitems] = useState<operation[] | null>();
  const [category, setcategory] = useState<string>("");
  const { trigger } = useContext(TriggerContext);
  const pathname = usePathname();
  const [inventories, setinventories] = useState<Inventories[] | null>(null);
  const [inventoryId, setinventoryId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = pathname.includes("achat")
          ? await getEntree()
          : await getSortie();
        setitems(res);
        const response = await getInventories();
        setinventories(response);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    getdata();
  }, [trigger, pathname]);
  const categories = items?.map((item) => item.category);
  const uniqueCategoriesSet = new Set(categories);
  const uniqueCategories: string[] = [];

  uniqueCategoriesSet.forEach((category) => {
    uniqueCategories.push(category);
  });

  const allStatus = {
    "en attente": "pending",
    terminé: "completed",
  };

  const filtredItemsByStatus = items?.filter((item) => {
    if (status && status !== "all") {
      return item.status === allStatus[status as "en attente" | "terminé"];
    }
    return true;
  });

  const filtredItemsByCategory = filtredItemsByStatus?.filter((item) => {
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
      const fromUTC = new Date(
        Date.UTC(
          fromDate.getFullYear(),
          fromDate.getMonth(),
          fromDate.getDate()
        )
      );
      const toUTC = new Date(
        Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())
      );

      const itemDateUTC = new Date(
        Date.UTC(
          itemDate.getFullYear(),
          itemDate.getMonth(),
          itemDate.getDate()
        )
      );

      return itemDateUTC >= fromUTC && itemDateUTC <= toUTC;
    } else if (fromDate && !toDate) {
      const fromUTC = new Date(
        Date.UTC(
          fromDate.getFullYear(),
          fromDate.getMonth(),
          fromDate.getDate()
        )
      );

      const itemDateUTC = new Date(
        Date.UTC(
          itemDate.getFullYear(),
          itemDate.getMonth(),
          itemDate.getDate()
        )
      );

      return itemDateUTC.getTime() === fromUTC.getTime();
    } else {
      return true;
    }
  });
  const isSortiePage = pathname.includes('sortie')
  

  return (
    <>
      <div className="max-w-[1100px] mx-auto space-y-16 sm:w-full p-6">
        <div className="flex justify-end w-full items-center gap-4 sm:flex-wrap sm:justify-start ">
          <DateRangeFilter date={date} setDate={setDate} />
          <Filters
            setStatus={setStatus}
            uniqueCategories={uniqueCategories}
            setcategory={setcategory}
            inventories={inventories}
            setinventoryId={setinventoryId}
            isSortiePage={isSortiePage}
          />
          <div>
            {user !== "user" && pathname.includes("achat") ? (
              <Button
                onClick={() => {
                  toggle();
                  settype("entree");
                }}
                className="flex items-center gap-x-2 font-bold w-[180px] sm:w-full"
              >
                <FaPlus />
                Ajouter une Entrée
              </Button>
            ) : (
              user !== "user" &&
              pathname.includes("sortie") && (
                <Button
                  onClick={() => {
                    toggle();
                    settype("sortie");
                  }}
                  className="flex items-center gap-x-2 font-bold w-[180px] sm:w-full"
                >
                  <FaPlus />
                  Ajouter une Sortie
                </Button>
              )
            )}
          </div>
        </div>
        <Suspense>
          <Items
            type={pathname.includes("achat") ? "achat" : "sortie"}
            items={filtredItemsByTime}
          />
        </Suspense>
      </div>

      {addEditModal && type === "entree" && (
        <AddEditAchat edit={false} operation={undefined} />
      )}
      {addEditModal && type === "sortie" && (
        <AddEditSortie edit={false} operation={undefined} />
      )}
    </>
  );
};
