"use client";
import React, {
  ReactNode,
  createContext,
  useState,
} from "react";

interface ContextProps {
  toggle: () => void;
  addEditModal: boolean;
}

export const AddEditModalContext = createContext<ContextProps>({
  toggle: () => {},
  addEditModal: false,
});

export const AddEditModalProvider = ({ children }: { children: ReactNode }) => {
  const [addEditModal, setAddEditModal] = useState<boolean>(false);

  const toggle = () => {
    setAddEditModal(!addEditModal);
  };

  return (
    <AddEditModalContext.Provider value={{ toggle, addEditModal }}>
      {children}
    </AddEditModalContext.Provider>
  );
};