import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";

interface IMediaUploaderBase extends ISaveableChildProps {
	text: string;
	aspectRatio?: number;
	isAvatar?: boolean;
	onVideoAdd?: (videoUrl: string, filename: string) => void;
	onImageAdd?: (avatarBlob: Blob, filename: string) => void;
	mediaType?: MediaType;
	isPortfolioImage?: boolean;
}

type MediaType = 'image' | 'video';

interface IMediaImageUploader extends IMediaUploaderBase {
	mediaType: 'image';
	isAvatar?: boolean;
	aspectRatio?: number;
	onImageAdd: (avatarBlob: Blob, filename: string) => void;
	onVideoAdd?: never;
	isPortfolioImage?: boolean;
}

interface IMediaVideoUploader extends IMediaUploaderBase {
	mediaType: 'video';
	onVideoAdd: (videoUrl: string, filename: string) => void;
	onImageAdd?: never;
	isAvatar?: never;
	aspectRatio?: never;
	isPortfolioImage?: never;
}

export type MediaUploaderProps = IMediaImageUploader | IMediaVideoUploader;