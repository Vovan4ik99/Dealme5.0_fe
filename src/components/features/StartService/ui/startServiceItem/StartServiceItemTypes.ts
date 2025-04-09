import {IPipelineMainTaskDetailsForm} from "@components/features/StartService/items/pipeline-main-task-modal/pipelineMainTaskDetails/PipelineMainTaskDetailsTypes.ts";

export interface IListItemProps {
    description: string[];
    onEdit: (order?: IPipelineMainTaskDetailsForm) => void;
    onDelete: () => void;
    title: string;
}