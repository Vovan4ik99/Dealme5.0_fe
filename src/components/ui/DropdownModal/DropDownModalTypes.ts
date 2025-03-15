import React from "react";

export interface IDropdownModalProps {
    isOpen: boolean;
    renderEntities: () => React.ReactNode | React.ReactNode[];
    isFullWidth: boolean;
}

