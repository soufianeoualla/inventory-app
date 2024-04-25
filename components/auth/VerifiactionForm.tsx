"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/loading";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useCallback, useEffect, useState } from "react";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { verification } from "@/actions/verification";

export const VerifiactionForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const onSubmit = useCallback(() => {
    if (!token) return setError("Token invalide");
    verification(token).then((data) => {
      setError(data?.error);
      setSuccess(data?.success);
      if (data?.success) {
        setTimeout(() => {
          setSuccess("Redirection en cours...");
          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
        }, 2000);
      }
    });
  }, [token, router]);

  useEffect(() => {
    if (success) return;
    onSubmit();
  }, [onSubmit, success]);

  return (
    <Card className="w-[400px] text-center h-[150px] space-y-5 bg-gradient-to-br from-accent/40 to-card border-white/10">
      <CardHeader>
        <CardTitle>{"Confirmation de votre e-mail"}</CardTitle>
      </CardHeader>
      <CardContent>
        {!error && !success && <Loading />}
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
      </CardContent>
    </Card>
  );
};
