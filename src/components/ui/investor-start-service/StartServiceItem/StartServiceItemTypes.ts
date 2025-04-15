import {IPipelineMainTaskDetailsForm} from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/mainTaskActivityDetails/MainTaskActivityDetailsTypes.ts";

export interface IListItemProps {
    description: (string | string[])[];
    onEdit: (order?: IPipelineMainTaskDetailsForm) => void;
    onDelete: () => void;
    title: string;
    isEditDisabled?: boolean;
}