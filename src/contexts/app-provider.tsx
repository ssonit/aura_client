"use client";

import { User } from "@/types/auth";
import { BoardPinModalEdit } from "@/types/pin";
import {
  useState,
  useContext,
  createContext,
  useCallback,
  useEffect,
  useMemo,
} from "react";

interface AppContextInterface {
  isModalOpen: boolean;
  handleModalOpen: (isOpen: boolean) => void;
  isModalUpdateBoard: boolean;
  handleModalUpdateBoard: (isOpen: boolean) => void;
  isModalConfirmDeleteBoard: boolean;
  handleModalConfirmDeleteBoard: (isOpen: boolean) => void;
  isModalBoardPinEdit: BoardPinModalEdit;
  handleModalBoardPinEdit: (payload: BoardPinModalEdit) => void;
  isModalSoftDeletePin: boolean;
  handleModalSoftDeletePin: (isOpen: boolean) => void;
  isModalEditPin: boolean;
  handleModalEditPin: (isOpen: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const initialAppContext: AppContextInterface = {
  isModalOpen: false,
  handleModalOpen: () => {},
  isModalUpdateBoard: false,
  handleModalUpdateBoard: () => {},
  isModalConfirmDeleteBoard: false,
  handleModalConfirmDeleteBoard: () => {},
  isModalBoardPinEdit: { boardPinId: "", url: "", pinId: "", user_id_pin: "" },
  handleModalBoardPinEdit: () => {},
  isModalSoftDeletePin: false,
  handleModalSoftDeletePin: () => {},
  isModalEditPin: false,
  handleModalEditPin: () => {},
  user: null,
  setUser: () => {},
  isAuthenticated: false,
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
  const [isModalOpen, setIsModalOpen] = useState(initialAppContext.isModalOpen);
  const [isModalUpdateBoard, setIsModalUpdateBoard] = useState(
    initialAppContext.isModalUpdateBoard
  );
  const [isModalConfirmDeleteBoard, setIsModalConfirmDeleteBoard] = useState(
    initialAppContext.isModalConfirmDeleteBoard
  );
  const [isModalBoardPinEdit, setIsModalBoardPinEdit] = useState(
    initialAppContext.isModalBoardPinEdit
  );
  const [isModalSoftDeletePin, setIsModalSoftDeletePin] = useState(
    initialAppContext.isModalSoftDeletePin
  );

  const [isModalEditPin, setIsModalEditPin] = useState(
    initialAppContext.isModalEditPin
  );

  const [user, setUserState] = useState<User | null>(initialAppContext.user);

  const isAuthenticated = useMemo(() => Boolean(user), [user]);
  const setUser = useCallback((user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, []);

  const handleModalOpen = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleModalUpdateBoard = (isOpen: boolean) => {
    setIsModalUpdateBoard(isOpen);
  };

  const handleModalConfirmDeleteBoard = (isOpen: boolean) => {
    setIsModalConfirmDeleteBoard(isOpen);
  };

  const handleModalBoardPinEdit = (payload: BoardPinModalEdit) => {
    setIsModalBoardPinEdit(payload);
  };

  const handleModalSoftDeletePin = (isOpen: boolean) => {
    setIsModalSoftDeletePin(isOpen);
  };

  const handleModalEditPin = (isOpen: boolean) => {
    setIsModalEditPin(isOpen);
  };

  useEffect(() => {
    const _user = localStorage.getItem("user");
    setUserState(_user ? JSON.parse(_user) : null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        handleModalOpen,
        isModalUpdateBoard,
        handleModalUpdateBoard,
        isModalConfirmDeleteBoard,
        handleModalConfirmDeleteBoard,
        isModalBoardPinEdit,
        handleModalBoardPinEdit,
        isModalSoftDeletePin,
        handleModalSoftDeletePin,
        isModalEditPin,
        handleModalEditPin,
        user,
        setUser,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
