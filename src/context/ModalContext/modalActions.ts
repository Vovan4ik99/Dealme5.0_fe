import { IBaseModal } from "@context/ModalContext/ModalContext.ts";

export enum ModalActions {
	OPEN_MODAL = 'OPEN_MODAL',
	CLOSE_MODALS = 'CLOSE_MODALS',
	CLOSE_ALL_MODALS = 'CLOSE_ALL_MODALS',
}

export interface IOpenModal {
	type: ModalActions.OPEN_MODAL;
	payload: IBaseModal;
}

export interface ICloseModals {
	type: ModalActions.CLOSE_MODALS;
	payload: number;
}

export interface ICloseAllModals {
	type: ModalActions.CLOSE_ALL_MODALS;
}


export type ModalAction = IOpenModal | ICloseModals | ICloseAllModals;