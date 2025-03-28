import { ReactNode } from "react";

export interface IPipelineItem {
    title: string;
    subtitle: string;
    destiny: string;
    icon: ReactNode;
}

export interface IPipelineStepProps extends IPipelineItem {
    onSubmit: () => void;
}