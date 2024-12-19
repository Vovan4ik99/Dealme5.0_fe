import { ReactNode } from "react";

export interface IReusableModalProps {
    title: string;
    onClose: () => void;
    onSave: () => void;
    children: ReactNode;
    width?: string;
  }