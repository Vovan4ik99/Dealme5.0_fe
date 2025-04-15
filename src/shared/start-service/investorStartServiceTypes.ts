import {ISector, ISubIndustry} from "@shared/onboarding/freelancerOnboardingTypes.ts";

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

export interface ICompanySizeResponse {
    name: string,
    description: string,
    target: string
}

export interface IMainTaskActivityBase {
    amount: number;
    startDate: Date;
    period: number;
    description: string;
}

export interface IMainTaskActivityRequest extends IMainTaskActivityBase {
    pipelineMainTaskId: number;
}

interface IMainTaskActivityResponse extends IMainTaskActivityBase {
    pipelineMainTaskDTO: {
        id: number;
        name: string;
    };
}

export interface IInvestorPipelineSupportStageResponse {
    id: number;
    pipelineDTO: IPipelineResponse;
    pipelineSupportMainTaskActivityDTOS: IMainTaskActivityResponse[];
}

export interface IBuyerPersonResponse {
    id: number;
    name: string;
    groupName: string;
}

export interface IProductRequest {
    name: string;
    subIndustryId: number;
    description?: string;
    sectorIds: number[];
    companySize: string[];
    buyerPersonIds: number[];
    additionalNotes?: string;
    country: string;
    state: string;
    city: string;
}

export interface IProductResponse {
    id: number;
    name: string;
    subIndustry: ISubIndustry;
    description?: string;
    sectors: ISector[];
    companySize: ICompanySizeResponse[];
    buyerPersons: IBuyerPersonResponse[];
    additionalNotes?: string;
    country?: string;
    state?: string;
    city?: string;
}

export interface IProductItem {
    id?: number;
    name: string;
    subIndustry: string;
    description?: string;
    sector: string[];
    companySize: string[];
    buyerPerson: string[];
    additionalNotes?: string;
    country?: string;
    state?: string;
    city?: string;
}

