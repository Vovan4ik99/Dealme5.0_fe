import {SaveableChildProps} from "@context/ModalContext/ModalContext.ts";

export interface IBgImageModalItemProps extends SaveableChildProps {
	onSave: (imageBlob: Blob, filename: string) => void;
}