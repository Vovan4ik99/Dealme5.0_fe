export interface IActivityModalItemProps {
	name: string;
	level: number;
	onDelete: () => void;
	onLevelUpdate: (level: number) => void;
}