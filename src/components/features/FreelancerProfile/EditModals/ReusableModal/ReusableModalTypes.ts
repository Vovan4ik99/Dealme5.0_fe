import { ReactNode } from "react";

export interface IReusableModalProps {
    title: string;
    onClose: () => void;
    onSave: () => void;
    children: ReactNode;
    width?: string;
    button?:string;
    positionClass?: string;
    disableOverlayBackground? : boolean;
  }