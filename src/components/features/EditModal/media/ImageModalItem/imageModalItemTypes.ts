import React from "react";
import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";

export interface IImageModalItemProps extends ISaveableChildProps{
	title: string;
	imageSize: string;
	emptyState: React.ReactNode;
	onSave: (blob: Blob, filename: string) => void;
	onDelete: () => void;
	isAvatar: boolean;
}