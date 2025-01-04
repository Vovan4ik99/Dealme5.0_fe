export interface IWorkingHoursProps {
  onClose: () => void;
  userWorkingHours: string | null;
  onSave: (newHours: string) => void;
}
