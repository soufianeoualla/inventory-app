"use client";
import { Button } from "@/components/ui/button";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loading from "../loading";
import { AddEditAchat } from "../modals/AddEditAchat";
import { DeleteModal } from "../modals/DeleteModal";
import { getSingleEntree } from "@/data/entree";
import { getSingleSortie } from "@/data/sortie";
import { TriggerContext } from "@/context/TriggerContext";
import { formatDate, formatPrice } from "@/lib/functions";
import { getCategoryColor } from "@/lib/color";
import { AddEditSortie } from "../modals/AddEditSortie";
import { entree } from "@prisma/client";



export const OperationOverview = () => {
  const { addEditModal, toggle } = useContext(AddEditModalContext);
  const { trigger } = useContext(TriggerContext);
  const [operation, setOperation] = useState<entree>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/")[2];
  const getData = useCallback(async () => {
    if (!id) return;
    const response = pathname.includes("achat")
      ? await getSingleEntree(id)
      : await getSingleSortie(id);
    if (!response) return;
    setOperation(response);
  }, [id, pathname]);

  useEffect(() => {
    getData();
  }, [getData, trigger]);

  if (!operation)
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="w-[730px] mt-[50px] mx-auto md:w-full  md:p-8 ">
        <Button
          onClick={() => {
            router.back();
          }}
          variant={"ghost"}
          className="flex items-center gap-6 font-bold hover:bg-transparent focus:text-primary hover:text-primary text-white "
        >
          <FaChevronLeft className="text-primary w-4 h-4  " />
          Go back
        </Button>

        <div className="w-full h-[88px] rounded-lg flex items-center justify-between px-8 py-6  mt-8 bg-card/20">
          <div className="flex items-center sm:w-full sm:justify-between gap-5">
            <small className="text-[13px] font-medium text-card-foreground  ">
              Category
            </small>
            <div
              style={{
                background: `hsla(${getCategoryColor(
                  operation.category
                )}, 0.15)`,
              }}
              className={`px-2 h-10   rounded-md flex items-center justify-center gap-2  `}
            >
              <div
                style={{
                  background: `hsla(${getCategoryColor(operation.category)})`,
                }}
                className={`w-2 h-2 rounded-full `}
              />
              <b
                style={{
                  color: `hsla(${getCategoryColor(operation.category)})`,
                }}
                className={` capitalize tracking-wide`}
              >
                {operation.category}
              </b>
            </div>
          </div>

          <div className="space-x-2 sm:fixed sm:bottom-0 sm:left-0 md:bg-Slate-Teal sm:flex sm:justify-center sm:w-screen sm:h-20 sm:items-center ">
            <Button
              onClick={() => {
                toggle();
              }}
              variant={"ghost"}
              className=" text-white pt-2.5 font-bold rounded-3xl h-12 w-16 hover:text-primary text-[15px] hover:bg-transparent focus:text-primary bg-Dusty-Aqua  "
            >
              Edit
            </Button>

            <Button
              onClick={() => setDeleteModal(true)}
              variant={"ghost"}
              className="bg-destructive/95 pt-2  text-white rounded-3xl w-[89px] h-12 text-[15px] font-bold tracking-wide hover:bg-destructive-foreground"
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="my-6  rounded-lg p-12 bg-card/20 sm:mb-10  ">
          <div className="flex items-center justify-between sm:flex-col sm:gap-y-8 sm:justify-start sm:items-start">
            <div className="grid gap-y-2">
              <strong className=" uppercase text-white text-[15px]">
                <span className=" ">#</span>
                {operation.id}
              </strong>
            </div>
            <div className="flex justify-center items-center gap-x-2 text-white font-bold capitalize">
              <div
                style={{
                  background: `hsla(${getCategoryColor(operation.inventoryName)})`,
                }}
                className={`w-2 h-2 rounded-full `}
              />
              {operation.inventoryName}
            </div>
          </div>

          <div className="flex gap-28 md:gap-20 mt-10 ">
            <div className="space-y-8">
              <div className="grid gap-2">
                <span className=" text-[13px] font-medium text-card-foreground">
                  Ajouter le
                </span>
                <strong className=" text-white text-[15px]">
                  {formatDate(operation.createdAt.toString())}
                </strong>
              </div>

              <div className="grid gap-2">
                <span className=" text-[13px] font-medium text-card-foreground">
                  {"Date"}
                </span>
                <strong className=" text-white text-[15px]">
                  {formatDate(operation.date.toString())}
                </strong>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-[13px]  text-card-foreground">
              <span className=" font-medium  ">Ajouter Par</span>
              <strong className="capitalize text-white text-[15px]">
                {operation.email}
              </strong>
            </div>
          </div>

          <div className="p-8 bg-Dusty-Aqua rounded-lg mt-11 text-[15px]">
            <table className="w-full sm:hidden">
              <tr className="text-muted-foreground ">
                <th>item Name</th>
                <th>Ref</th>
                <th>QTY.</th>
                <th>P.U</th>
                <th>Total</th>
              </tr>

              <tr className=" text-white">
                <td>{operation.article}</td>
                <td className=" text-card-foreground">{operation.ref}</td>
                <td className=" text-card-foreground">{operation.quantity}</td>
                <td className=" text-card-foreground">{formatPrice(operation.price)}</td>
                <td className=" text-card-foreground">{formatPrice(operation.total)}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      {deleteModal && (
        <DeleteModal id={operation.id} setDeleteModal={setDeleteModal} type="operation" />
      )}

      {addEditModal && pathname.includes('achat') && <AddEditAchat edit operation={operation} />}
      {addEditModal && pathname.includes('sortie') && <AddEditSortie edit operation={operation} />}

    </>
  );
};
