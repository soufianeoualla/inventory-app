"use client";
import { Button } from "@/components/ui/button";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { usePathname,useRouter } from "next/navigation";
import Loading from "../loading";
import { Summary } from "./Summary";
import { AddEdit } from "../AddEdit";
import { DeleteModal } from "../DeleteModal";


export const OperationOverview = () => {
  const { addEditModal, toggle } = useContext(AddEditModalContext);
//   const { triggerToggle, trigger } = useContext(TriggerContext);
  const [operation, setOperation] = useState<any>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split('/')[1];

//   const getData = useCallback(async () => {
//     if (!id) return;
//     const response = await getSingleInvoice(id);
//     if (!response) return;
//     setInvoice(response as InvoiceProps);
//   }, [id]);

//   useEffect(() => {
//     getData();
//   }, [getData, trigger]);

  // if (!operation)
  //   return (
  //     <div className="h-screen flex justify-center items-center">
  //       <Loading />
  //     </div>
  //   );


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
              Status
            </small>
            <div
              className={`w-[104px] h-10 ${'statusColors'}  bg-opacity-10 rounded-md flex items-center justify-center gap-2`}
            >
              <div className={`w-2 h-2 rounded-full ${'statusColors'} `} />
              <b className={` capitalize`}>{'invoice.status'}</b>
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

       <Summary  />
      </div>
      {deleteModal && (
        <DeleteModal id={'45'} setDeleteModal={setDeleteModal} />
      )}

      {addEditModal && <AddEdit type="so" />}
    </>
  );
};