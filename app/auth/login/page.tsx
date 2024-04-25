import CardWrapper from "@/components/auth/CardWrapper";
import React from "react";

const LoginPage = () => {
  return (
    <CardWrapper
      headerLabel="Bienvenue "
      backButtonHref="/auth/register"
      backButtonLabel="Pas encore membre ? Inscrivez-vous"
      type="login"
    />
  );
};

export default LoginPage;
