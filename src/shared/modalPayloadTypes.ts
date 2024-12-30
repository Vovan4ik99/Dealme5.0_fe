export interface BgImageEditPayload {
	filename: string | null;
	blob: Blob | null;
}

export interface BgImageUploadPayload {
	mediaSrc: string;
	aspect: number;
	filename: string;
}

export type ModalPayloads = {
	bgImageEdit: BgImageEditPayload;
	bgImageUpload: BgImageUploadPayload;
	bgImageCrop: unknown;
};