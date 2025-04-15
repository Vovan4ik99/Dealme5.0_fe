import {
    IPipelineMainTaskDetailsForm
} from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/mainTaskActivityDetails/MainTaskActivityDetailsTypes.ts";

interface IMainTaskInfo {
    id?: number;
    name?: string;
}

export interface IPipelineMainTaskItem extends IPipelineMainTaskDetailsForm {
    id?: number;
    pipelineMainTaskDTO: IMainTaskInfo;
}

interface BaseProps {
    selectedMainTask: number[];
    selectedPipeline: number;
}

interface AddModeProps extends BaseProps {
    mode: 'add';
    onSubmit: (orderDetails: IPipelineMainTaskItem) => void;
    currentOrder?: undefined;
}

interface EditModeProps extends BaseProps {
    mode: 'edit';
    onSubmit: (orderDetails: IPipelineMainTaskItem, orderId: number) => void;
    currentOrder: IPipelineMainTaskItem;
}

export type IPipelineModalProps = AddModeProps | EditModeProps;

export interface IModalStep {
    index: number;
    title: string;
}

