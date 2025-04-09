import {
    IPipelineMainTaskDetailsForm
} from "@components/features/StartService/items/pipeline-main-task-modal/pipelineMainTaskDetails/PipelineMainTaskDetailsTypes.ts";

interface BaseProps {
    selectedMainTask: number[];
}

interface IMainTaskInfo {
    id?: number;
    name?: string;
}

export interface IPipelineMainTaskItem extends IPipelineMainTaskDetailsForm {
    id?: number;
    mainTask: IMainTaskInfo;
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

