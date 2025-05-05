import { ReactNode } from "react";

type btnColors = "main" | "secondary" ;

export interface IBasicBtnProps {
    text: ReactNode;
    handleClick: () => void;
    colors: btnColors;
}