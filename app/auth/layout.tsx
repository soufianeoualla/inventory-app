import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      {children}
    </div>
  );
};

export default AuthLayout;
