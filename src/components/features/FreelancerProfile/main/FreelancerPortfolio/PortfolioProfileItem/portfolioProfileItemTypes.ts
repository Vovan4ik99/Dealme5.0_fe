export interface IPortfolioProfileItemProps {
	picture: string;
	title: string;
	comment: string;
	onPreviewClick: () => void;
	onEditClick: () => void;
}