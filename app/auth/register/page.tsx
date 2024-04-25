import CardWrapper from "@/components/auth/CardWrapper";
import React from "react";

const RegisterPage = () => {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Déjà un compte ? Connexion"
      type="register"
      headerLabel="Créer un compte"
    />
  );
};

export default RegisterPage;
