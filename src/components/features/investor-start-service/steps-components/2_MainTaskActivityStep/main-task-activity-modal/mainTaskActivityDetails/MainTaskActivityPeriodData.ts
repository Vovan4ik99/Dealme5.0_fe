export const mainTaskActivityPeriodData = [
    "1 miesiąc",
    "2 miesiące",
    "3 miesiące",
    "6 miesięcy"
];


export const getMonthsFromLabel = (label: string): number => {
    switch (label) {
        case mainTaskActivityPeriodData[0]:
            return 1;
        case mainTaskActivityPeriodData[1]:
            return 2;
        case mainTaskActivityPeriodData[2]:
            return 3;
        case mainTaskActivityPeriodData[3]:
            return 6;
        default:
            return 0;
    }
};

export const getLabelFromMonths = (months: number): string => {
    switch (months) {
        case 1:
            return mainTaskActivityPeriodData[0];
        case 2:
            return mainTaskActivityPeriodData[1];
        case 3:
            return mainTaskActivityPeriodData[2];
        case 6:
            return mainTaskActivityPeriodData[3];
        default:
            return "";
    }
};

