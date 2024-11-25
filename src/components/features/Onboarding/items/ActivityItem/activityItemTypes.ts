export interface IActivityItemProps {
	id: number;
	name: string;
	info: string;
	level: number;
	onSelect: (activityId: number, level: number) => void;
}