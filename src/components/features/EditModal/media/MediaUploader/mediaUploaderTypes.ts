import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";

export interface IMediaUploaderProps extends ISaveableChildProps {
	text: string;
	aspectRatio: number;
	isAvatar: boolean;
}