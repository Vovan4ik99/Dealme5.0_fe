import {IBaseModal, ModalId} from "@context/ModalContext/ModalContext.ts";
import {ModalPayloads} from "@shared/modalPayloadTypes.ts";

export enum ModalActions {
	OPEN_MODAL = 'OPEN_MODAL',
	CLOSE_MODALS = 'CLOSE_MODALS',
	CLOSE_ALL_MODALS = 'CLOSE_ALL_MODALS',
	UPDATE_MODAL_DATA = 'UPDATE_MODAL_DATA',
}

export interface IOpenModal {
	type: ModalActions.OPEN_MODAL;
	payload: IBaseModal<ModalId>;
}

export interface ICloseModals {
	type: ModalActions.CLOSE_MODALS;
	payload: number;
}

export interface ICloseAllModals {
	type: ModalActions.CLOSE_ALL_MODALS;
}

export interface IUpdateModalData {
	type: ModalActions.UPDATE_MODAL_DATA;
	payload: { id: ModalId; data: ModalPayloads[ModalId] }
}

export type ModalAction = IOpenModal | ICloseModals | ICloseAllModals | IUpdateModalData;