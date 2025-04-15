import { IInvestorData } from "@shared/investor/common.ts";
import React from "react";

export interface IStartServiceComponentProps {
    onSubmit: () => void;
    userData: IInvestorData;
    navigate?: (index: number) => void;
}

export interface IStartServiceStep{
    title: string;
    subtitle: string;
    component: React.ComponentType<IStartServiceComponentProps> | undefined;
}