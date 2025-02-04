import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";

export interface IAddVideoModalItemBaseProps extends ISaveableChildProps {
	onSave: () => void;
	isEdit?: boolean;
}

export interface IAddVideoModalItemWithEditProps extends IAddVideoModalItemBaseProps {
	isEdit: true;
	video: string;
	filename: string;
	title: string;
	videoId: number;
}

export interface IAddVideoModalItemWithoutEditProps extends IAddVideoModalItemBaseProps {
	isEdit?: false;
	video?: never;
	filename?: never;
	title?: never;
	videoId?: never;
}

export type IAddVideoModalItemProps =
	| IAddVideoModalItemWithEditProps
	| IAddVideoModalItemWithoutEditProps;
