import { SingleItem } from "./SingleItem";
import Loading from "./loading";
import Image from "next/image";
import ullistration from "@/components/assets/illustration-empty.svg";
import { operation } from "@prisma/client";

interface SingleItemProp {
  type: string;
  items: operation[] | undefined | null;
}
export const Items = ({ type, items }: SingleItemProp) => {
  return (
    <div className="max-w-[900px] mx-auto uppercase text-[13px] sm:w-full">
      {!items && (
        <div className="flex items-center justify-center h-[70vh]">
          <Loading />
        </div>
      )}

      {items?.length === 0 && (
        <div className="flex flex-col justify-center items-center h-[60vh] text-center">
          <Image src={ullistration} alt="ullistration empty" />
          <h1 className="text-2xl font-bold mt-8 text-white">
            Il n&lsquo;y a rien ici{" "}
          </h1>
        </div>
      )}
      {items?.map((item) => (
        <SingleItem key={item.id} type={type} item={item} />
      ))}
    </div>
  );
};
