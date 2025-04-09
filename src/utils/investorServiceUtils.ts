import {IMainTaskActivityRequest} from "@shared/investor/pipelineMainTask.ts";
import {
    IModalStep,
    IPipelineMainTaskItem
} from "@components/features/StartService/items/pipeline-main-task-modal/PipelineMainTaskModalTypes.ts";

const formatDateToDDMMYYYY = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

export const createDescriptionDate = (start: Date, period: string) => {
    const monthsMatch = period.match(/\d+/);
    const months = monthsMatch ? parseInt(monthsMatch[0], 10) : 0;

    const end = new Date(start);
    end.setMonth(end.getMonth() + months);

    return `${months} ${pluralizeMonth(months)} (${formatDateToDDMMYYYY(start)}–${formatDateToDDMMYYYY(end)})`;
};

const pluralizeMonth = (count: number) => {
    if (count === 1) return "miesiąc";
    if (count >= 2 && count <= 4) return "miesiące";
    return "miesięcy";
};


export const orderSteps: IModalStep[] = [
    { index: 1 ,title: "Wybierz usługę" },
    { index: 2 ,title: "Określ szczegóły" }
]

export const orderRequestStartState: IPipelineMainTaskItem= {
    id: undefined,
    mainTask: {
        id: undefined,
        name: undefined,
    },
    amount: undefined,
    description: undefined,
    period: undefined,
    startDate: undefined
}

export const createPipelineMainTaskRequest = (formData: IPipelineMainTaskItem[]):  IMainTaskActivityRequest[] => {
    return formData.map(ord => ({
        amount: ord.amount!,
        startDate: ord.startDate!,
        period: ord.period!,
        description: ord.description!,
        pipelineMainTaskId: ord.mainTask.id!,
    }))
}