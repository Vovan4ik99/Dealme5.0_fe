export interface IPipelineMainTaskDetailsForm {
    amount?: number;
    startDate?: Date;
    period?: number;
    description?: string;
}

export interface IPipelineMainTaskDetailsProps {
    orderDetails: IPipelineMainTaskDetailsForm;
    mainTaskName: string;
    onSave: (order: IPipelineMainTaskDetailsForm) => void;
    onEdit: (order: IPipelineMainTaskDetailsForm) => void;
    isDisabled: (isValid: boolean) => void;
}

export interface IPipelineMainTaskDetailsRef {
    submitForm: () => void;
}

