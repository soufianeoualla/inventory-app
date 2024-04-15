import CardWrapper from "@/components/auth/CardWrapper";
import React from "react";

const RegisterPage = () => {
  return (
    <CardWrapper
      
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account? Sign In"
      type="register"
      headerLabel="Create an account"
    />
  );
};

export default RegisterPage;
