import React from "react";

export interface IDropdownModalProps {
    isOpen: boolean;
    renderItems: React.ReactNode[] | React.ReactNode;
    width: number | "Fitted";
}

