export type ILevelPickerProps = {
	selectedLevel: number | null;
	withoutHoverEffect?: false;
	onLevelSelect: (level: number) => void;
} | {
	selectedLevel: number | null;
	withoutHoverEffect: true;
	onLevelSelect?: never;
};

