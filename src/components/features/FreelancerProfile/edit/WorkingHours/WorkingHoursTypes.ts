export interface WorkingHoursProps {
	onClose: () => void;
	userWorkingHours: string | null;
    onSave: (newHours: string) => void;
}