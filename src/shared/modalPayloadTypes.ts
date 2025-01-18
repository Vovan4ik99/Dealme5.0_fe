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
	bgImageCrop: unknown;
	primaryInfoEdit: unknown;
	subIndustriesEdit: ISubIndustriesEditPayload;
	subIndustriesAdd: unknown;
	workingDaysEdit: unknown;
	workingHoursEdit: unknown;
	localizationEdit: unknown;
	languagesEdit: unknown;
	languageAdd: unknown;
};