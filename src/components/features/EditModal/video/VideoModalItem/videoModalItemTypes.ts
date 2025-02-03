export interface IVideoModalItemProps {
	videoUrl: string | null;
	fileName: string;
	onClick: () => void;
	onDelete: () => void;
	label: string;
	emptyStateText: string;
}
