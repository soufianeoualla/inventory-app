"use client";
import {
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { FaArrowUpLong } from "react-icons/fa6";
import { getInventories } from "@/data/inventory";
import { article } from "@prisma/client";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { AddInventory } from "../modals/AddInventory";
import Link from "next/link";
import Loading from "../loading";
import { TriggerContext } from "@/context/TriggerContext";

import { UserContext } from "@/context/UserContext";

export interface Inventories {
  id: string;
  companyId: string;
  name: string;
  method: string;
  article: article[];
}

const InventoryList = () => {
  const { toggle, addEditModal, settype, type } =
    useContext(AddEditModalContext);
  const { trigger } = useContext(TriggerContext);
  const { user } = useContext(UserContext);
  const [inventories, setinventories] = useState<Inventories[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      const response = await getInventories();
      setinventories(response);
    };
    getData();
  }, [trigger]);
  if (!inventories)
    return (
      <div className="flex items-center justify-center h-[80vh] ">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 h-[80vh]">
        <div className="flex items-center sm:justify-center gap-4 flex-wrap">
          {inventories?.map((item,index) => (
            <Card
              key={item.id}
              className="bg-card border-none  p-6 w-[250px] relative flex justify-between items-center "
            >
              <div className="space-y-3 uppercase">
                {item.name}
                <div>article: {item.article.length}</div>
                <div className="bg-purple/15 flex justify-center items-center rounded-md p-2 gap-x-2">
                  <div className="h-2 w-2 rounded-full bg-purple" />
                  {item.method}
                </div>
              </div>

              <Link href={`/inventaire/${item.id}`}>
                <div className="w-10 h-10 rounded-full text-dark bg-white flex justify-center items-center hover:scale-110 hover:bg-primary hover:text-white">
                  <FaArrowUpLong className=" rotate-45" />
                </div>
              </Link>
             
            </Card>
          ))}
        </div>
        {inventories.length < 3 && user !== "user" && (
          <Button
            onClick={() => {
              toggle();
              settype("inventaire");
            }}
          >
            Créer un inventaire
          </Button>
        )}
      </div>
      {addEditModal && type === "inventaire" && <AddInventory />}
    </>
  );
};

export default InventoryList;


