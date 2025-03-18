import React from "react";

export interface ILoggedUserOption {
    value: string;
    icon: React.ReactNode;
    onClick?: () => void;
}