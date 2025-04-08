import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";
import { IAboutMeInfo } from "@shared/freelancer/common.ts";

export interface IAboutMeModalItemProps extends ISaveableChildProps {
	aboutMeInfo: IAboutMeInfo | null;
	onSave: () => void;
}

export interface IAboutMeForm {
	about: string;
	mainPassion: string;
	video: string;
	filename: string;
}