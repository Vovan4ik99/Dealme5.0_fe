export interface ICalendarProps {
    isOpened: boolean;
    chooseDate: (date: Date) => void;
    chosenDate: Date | undefined;
}