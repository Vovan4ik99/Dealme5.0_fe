import { FieldError } from "react-hook-form";

export interface IVideoModalItemBaseProps {
	videoUrl: string | null;
	fileName: string;
	label: string;
	emptyStateText: string;
	error?: FieldError;
}

export interface IVideoModalItemWithDeleteProps extends IVideoModalItemBaseProps {
	withDelete: true;
	onClick: () => void;
	onDelete: () => void;
}

export interface IVideoModalItemWithoutDeleteProps extends IVideoModalItemBaseProps {
	withDelete?: false;
	onClick?: never;
	onDelete?: never;
}

export type IVideoModalItemProps = IVideoModalItemWithDeleteProps | IVideoModalItemWithoutDeleteProps;

