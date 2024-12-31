import {createContext, ReactElement, useContext} from "react";
import {ModalPayloads} from "@shared/modalPayloadTypes.ts";

export type ModalId = keyof ModalPayloads;

export type OnSaveCallback = () => void;

export interface ISaveableChildProps {
	registerOnSave?: (onSave: OnSaveCallback) => void;
}

export interface IBaseModal<T extends ModalId> {
	id: T;
	title: string;
	child: ReactElement<ISaveableChildProps>;
	btnText: string;
	btnWithIcon: boolean;
	payload?: ModalPayloads[T];
	shouldCloseOnSaving: boolean;
}

export interface IModalInitialState {
	modals: IBaseModal<ModalId>[];
}

export const InitialModalState: IModalInitialState = {
	modals: [],
}

export interface IModalContextValue extends IModalInitialState {
	openModal: <T extends ModalId>(modal: IBaseModal<T>) => void;
	closeAllModals: () => void;
	closeModals: (count: number) => void;
	updateModalData: <T extends ModalId>(id: T, data: ModalPayloads[T]) => void;
}

export const ModalContext = createContext<IModalContextValue>({
	modals: InitialModalState.modals,
	openModal: () => {},
	closeAllModals: () => {},
	closeModals: () => {},
	updateModalData: () => {},
});

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}
	return context;
}