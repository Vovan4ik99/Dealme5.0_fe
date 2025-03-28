import React from "react";

export interface IPipelineItem {
    title: string;
    subtitle: string;
    destiny: string;
    icon: React.ReactNode;

}

export interface IPipelineStepProps extends IPipelineItem {
    onSubmit: () => void;
}