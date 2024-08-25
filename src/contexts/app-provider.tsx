"use client";

import { useState, useContext, createContext } from "react";

interface AppContextInterface {
  isModalOpen: boolean;
  handleModalOpen: (isOpen: boolean) => void;
}

const initialAppContext: AppContextInterface = {
  isModalOpen: false,
  handleModalOpen: () => {},
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        handleModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
