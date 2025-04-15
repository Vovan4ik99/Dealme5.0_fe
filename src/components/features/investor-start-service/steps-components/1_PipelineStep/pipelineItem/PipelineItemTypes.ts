import { ReactNode } from "react";
import {IMainTask} from "@shared/start-service/investorStartServiceTypes.ts";

export interface IPipelineItem {
    id: number;
    title: string;
    subtitle: string;
    destiny: string;
    icon: ReactNode;
    mainTasks: IMainTask[];
}

export interface IPipelineStepProps extends IPipelineItem {
    onSubmit: (pipelineId: number) => void;
}