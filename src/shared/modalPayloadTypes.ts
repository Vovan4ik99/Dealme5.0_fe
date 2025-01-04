export interface ImageEditPayload {
	filename: string | null;
	blob: Blob | null;
}

export interface BgImageUploadPayload {
	mediaSrc: string;
	aspect: number;
	filename: string;
}

export type ModalPayloads = {
	imageEdit: ImageEditPayload;
	imageUpload: BgImageUploadPayload;
	bgImageCrop: unknown;
	primaryInfoEdit: unknown;
};