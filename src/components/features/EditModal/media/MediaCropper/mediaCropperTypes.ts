import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";

export interface IMediaCropperProps extends ISaveableChildProps {
	mediaType: 'image' | 'video';
	filename: string;
	mediaSrc: string;
	onClose: () => void;
	aspect: number;
	isAvatar: boolean;
}