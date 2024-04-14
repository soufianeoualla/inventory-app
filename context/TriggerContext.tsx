"use client";
import React, { ReactNode, createContext, useState } from "react";

interface ContextProps {
  triggerToggle: () => void;
  trigger: boolean;
}

export const TriggerContext = createContext<ContextProps>({
  triggerToggle: () => {},
  trigger: false,
});

export const TriggerProvider = ({ children }: { children: ReactNode }) => {
  const [trigger, setTrigger] = useState<boolean>(false);

  const triggerToggle = () => {
    setTrigger(!trigger);
  };

  return (
    <TriggerContext.Provider value={{ triggerToggle, trigger }}>
      {children}
    </TriggerContext.Provider>
  );
};