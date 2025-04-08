export interface IVideoEditModalItemProps {
	videoUrl: string;
	title: string;
	onEdit: () => void;
	onDelete: () => void;
	dateOfObtaining: string;
}