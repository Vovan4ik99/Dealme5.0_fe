import React from "react";

export interface IDropdownModalProps {
    isOpen: boolean;
    renderItems: React.ReactNode[] | React.ReactNode;
    secondRow?: React.ReactNode[] | React.ReactNode;
    width: number | "100%";
    isInside?: true;
    onClose?: () => void;
}

