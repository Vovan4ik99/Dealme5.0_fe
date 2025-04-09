export const pipelineMainTaskPeriodData = [
    "1 miesiąc",
    "2 miesiące",
    "3 miesiące",
    "6 miesięcy"
];


export const getMonthsFromLabel = (label: string): number => {
    switch (label) {
        case pipelineMainTaskPeriodData[0]:
            return 1;
        case pipelineMainTaskPeriodData[1]:
            return 2;
        case pipelineMainTaskPeriodData[2]:
            return 3;
        case pipelineMainTaskPeriodData[3]:
            return 6;
        default:
            return 0;
    }
};

export const getLabelFromMonths = (months: number): string => {
    switch (months) {
        case 1:
            return pipelineMainTaskPeriodData[0];
        case 2:
            return pipelineMainTaskPeriodData[1];
        case 3:
            return pipelineMainTaskPeriodData[2];
        case 6:
            return pipelineMainTaskPeriodData[3];
        default:
            return "";
    }
};

