import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";

export interface IImageCropperProps extends ISaveableChildProps {
	filename: string;
	mediaSrc: string;
	onClose: () => void;
	aspect: number;
	isAvatar: boolean;
	onSave: (blob: Blob, filename: string) => void;
}