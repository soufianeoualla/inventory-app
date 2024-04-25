"use client";
import { deleteInventory } from "@/actions/Inventaire";
import { deleteArticle } from "@/actions/article";
import { deleteEntree } from "@/actions/deleteEntree";
import { deleteSortie } from "@/actions/deleteSortie";
import { Button } from "@/components/ui/button";
import { NotificationContext } from "@/context/NotificationContext";
import { TriggerContext } from "@/context/TriggerContext";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useTransition } from "react";

interface DeleteModalProp {
  id: string;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  type: string;
}

export const DeleteModal = ({ id, setDeleteModal, type }: DeleteModalProp) => {
  const { triggerToggle } = useContext(TriggerContext);
  const [isPending, startTransition] = useTransition();
  const { notificationToggle, setError, setSuccess, success } =
    useContext(NotificationContext);
  const router = useRouter();
  const pathname = usePathname();

  const onDeleteEntree = () => {
    startTransition(() => {
      deleteEntree(id).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
      triggerToggle();
      router.back();
      notificationToggle();
    });
  };
  const onDeleteSortie = () => {
    startTransition(() => {
      deleteSortie(id).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
      triggerToggle();
      router.back();
      notificationToggle();
    });
  };
  const onDeleteArticle = () => {
    startTransition(() => {
      deleteArticle(id).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
      triggerToggle();
      notificationToggle();
      setDeleteModal(false);
    });
  };
  const onDeleteInventory = () => {
    startTransition(() => {
      deleteInventory(id).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
      triggerToggle();
      notificationToggle();
      setDeleteModal(false);
    });
  };

  const onDelete = () => {
    pathname.includes("achat")
      ? onDeleteEntree()
      : pathname.includes("sortie")
      ? onDeleteSortie()
      : type === "inventaire"
      ? onDeleteInventory()
      : onDeleteArticle();
  };
  return (
    <>
      <div
        onClick={() => setDeleteModal(false)}
        className="fixed inset-0 w-full h-full  z-40 bg-background/80"
      ></div>

      <form className="w-[480px] absolute top-[20%] left-1/2 -translate-x-1/2 translate-y-1/2  rounded-lg p-12 z-50   bg-dark sm:w-[90%]">
        <h1 className="text-xl font-bold -tracking-tighter mb-3  text-white">
          Confirmer la suppression
        </h1>
        <p className="text-Soft-Teal text-sm text-white/80">
          Êtes-vous sûr de vouloir supprimer ceci {type} Cette action est irréversible.
        </p>
        <div className="flex justify-end items-center mt-4 gap-x-2">
          <Button
            disabled={isPending}
            onClick={() => setDeleteModal(false)}
            variant={"ghost"}
            type="button"
            className="text-base pt-2 h-12  text-Subtle-Turquoise hover:bg-transparent font-bold rounded-3xl  bg-Dusty-Aqua text-white"
          >
            Annuler
          </Button>
          <Button
            disabled={isPending}
            onClick={onDelete}
            variant={"destructive"}
            className="text-base pt-2 rounded-3xl h-12  font-bold  text-white "
          >
            Supprimer
          </Button>
        </div>
      </form>
    </>
  );
};
