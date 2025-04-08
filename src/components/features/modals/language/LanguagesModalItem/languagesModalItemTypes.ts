import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";

export interface ILanguagesModalItemProps extends ISaveableChildProps {
	onSave: () => void;
}