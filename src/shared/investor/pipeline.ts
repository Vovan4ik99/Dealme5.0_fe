
export interface IMainTask {
    id: number;
    name: string;
    description: string;
}

export interface IPipelineResponse {
    id: number;
    name: string;
    description: string;
    goal: string;
    pipelineMainTasks: IMainTask[];
}
