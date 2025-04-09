import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";

export interface IPipelineMainTaskDetails {
    amount?: number;
    startDate?: Date;
    period?: number;
    description?: string;
}

export interface IPipelineMainTaskDetailsForm extends IPipelineMainTaskDetails {
    mainTaskName: string;
}

export interface IPipelineMainTaskDetailsProps extends ISaveableChildProps {
    orderItem: IPipelineMainTaskDetailsForm;
    onSave: (order: IPipelineMainTaskDetailsForm) => void;
    onEdit: (order: IPipelineMainTaskDetailsForm) => void;
}

