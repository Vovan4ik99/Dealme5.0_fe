import {IAboutMeInfo} from "@shared/freelancerTypes.ts";
import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";

export interface IAboutMeModalItemProps extends ISaveableChildProps {
	aboutMeInfo: IAboutMeInfo | null;
	onSave: () => void;
}