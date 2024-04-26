"use client";
import { useEffect } from "react";
import { addPendingEntree } from "@/actions/Entree";
import { createContext, ReactNode } from "react";

export const PendingEntreeContext = createContext({});

export const PendingEntreeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  useEffect(() => {
    addPendingEntree();
  }, []);

  return (
    <PendingEntreeContext.Provider value={{}}>
      {children}
    </PendingEntreeContext.Provider>
  );
};
