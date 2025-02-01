import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";

export interface IVideoPreviewerProps extends ISaveableChildProps {
	onClose: () => void;
	videoUrl: string;
}