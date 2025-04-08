import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";

export interface ISectorsModalItemProps extends ISaveableChildProps {
	onSave: () => void;
}