export interface IMainTaskBaseInfo {
    id: number;
    name: string;
}

export interface IAddPipelineMainTaskProps {
    currentMainTaskId?: number;
    handleMainTaskSelect: (mainTask: IMainTaskBaseInfo) => void;
    selectedMainTaskId: number[];
    currentPipeline: number;
}
