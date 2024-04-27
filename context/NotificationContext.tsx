"use client";
import { PopUpMessage } from "@/components/modals/PopUpMessage";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface ContextProps {
  notificationToggle: () => void;
  notification: boolean;
  error: string | undefined;
  success: string | undefined;
  setError: Dispatch<SetStateAction<string | undefined>>;
  setSuccess: Dispatch<SetStateAction<string | undefined>>;
}

export const NotificationContext = createContext<ContextProps>({
  notificationToggle: () => {},
  notification: false,
  error: "",
  success: "",
  setError: () => {},
  setSuccess: () => {},
});

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const notificationToggle = () => {
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 5000);
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationToggle,
        notification,
        error,
        setError,
        setSuccess,
        success,
      }}
    >
      {notification && <PopUpMessage />} {children}
    </NotificationContext.Provider>
  );
};
