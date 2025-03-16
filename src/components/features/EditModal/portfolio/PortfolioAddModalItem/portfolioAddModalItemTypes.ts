import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";

export interface IPortfolioForm {
	title: string;
	info: string;
	picture: Blob | undefined;
	filename: string | undefined;
}

export interface IPortfolioAddModalItemProps extends ISaveableChildProps {
	onSave: (portfolio: FormData) => void;
}