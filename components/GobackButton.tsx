"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { Button } from "./ui/button";

const GobackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.back();
      }}
      variant={"ghost"}
      className="flex items-center gap-6 font-bold hover:bg-transparent focus:text-primary hover:text-primary text-white sm:absolute sm:left-0 sm:top-0 "
    >
      <FaChevronLeft className="text-primary w-4 h-4  " />
      {"Retourner"}
    </Button>
  );
};

export default GobackButton;
