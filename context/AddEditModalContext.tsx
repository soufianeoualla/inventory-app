"use client";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface ContextProps {
  toggle: () => void;
  addEditModal: boolean;
  type: string;
  settype: Dispatch<SetStateAction<string>>;
}

export const AddEditModalContext = createContext<ContextProps>({
  toggle: () => {},
  addEditModal: false,
  type: "",
  settype: () => {},
});

export const AddEditModalProvider = ({ children }: { children: ReactNode }) => {
  const [addEditModal, setAddEditModal] = useState<boolean>(false);
  const [type, settype] = useState<string>("");

  const toggle = () => {
    setAddEditModal(!addEditModal);
  };

  return (
    <AddEditModalContext.Provider
      value={{ toggle, addEditModal, type, settype }}
    >
      {children}
    </AddEditModalContext.Provider>
  );
};
