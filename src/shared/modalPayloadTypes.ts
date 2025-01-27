import {ISubIndustry} from "@shared/onboardingTypes.ts";

export interface IImageEditPayload {
	filename: string | null;
	blob: Blob | null;
}

export interface IBgImageUploadPayload {
	mediaSrc: string;
	aspect: number;
	filename: string;
}

export interface ISubIndustriesEditPayload {
	subIndustries: ISubIndustry[];
}

export type ModalPayloads = {
	imageEdit: IImageEditPayload;
	imageUpload: IBgImageUploadPayload;
	unknown: unknown;
	subIndustriesEdit: ISubIndustriesEditPayload;
};