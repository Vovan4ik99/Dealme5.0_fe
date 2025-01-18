export interface IWorkingHoursListProps {
	selectedHour: string | null;
	onChange: (hour: string) => void;
}