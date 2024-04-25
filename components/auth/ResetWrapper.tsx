"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import logo from "@/public/logo.png";
import { ResetForm } from "@/components/auth/ResetForm";
import { useSearchParams } from "next/navigation";
import { ResetPassword } from "./ResetPassword";

const ResetWrapper = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return (
    <Card className="w-[400px] mx-auto bg-gradient-to-br from-accent/40 to-card border-white/10">
      <CardHeader className=" space-y-3 flex items-center gap-x-3">
        <div className="flex items-center gap-x-3 font-bold tracking-wide">
          <Image
            width={50}
            height={50}
            src={logo}
            alt="inventory app logo"
            className=""
          />
          Inventory App
        </div>

        <CardDescription>{"Réinitialiser votre mot de passe"} </CardDescription>
      </CardHeader>
      <CardContent className=" grid gap-4">
        {token ? <ResetPassword token={token} /> : <ResetForm />}
      </CardContent>
    </Card>
  );
};

export default ResetWrapper;
