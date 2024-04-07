import CardWrapper from "@/components/auth/CardWrapper";
import React from "react";

const LoginPage = () => {
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonHref="/auth/register"
      backButtonLabel="Not a member yet? Sign Up"
      type="login"
    />
  );
};

export default LoginPage;
