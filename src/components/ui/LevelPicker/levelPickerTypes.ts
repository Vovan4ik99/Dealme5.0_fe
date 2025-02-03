export interface ILevelPickerProps {
	selectedLevel: number | null;
	onLevelSelect: (level: number) => void;
}