import {SaveableChildProps} from "@context/ModalContext/ModalContext.ts";

export interface IMediaCropperProps extends SaveableChildProps {
	mediaType: 'image' | 'video';
	filename: string;
	mediaSrc: string;
	onClose: () => void;
	aspect: number;
}