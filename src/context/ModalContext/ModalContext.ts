import { createContext, ReactElement, useContext } from "react";

export type OnSaveCallback = () => void;

export interface ISaveableChildProps {
	//Allows to register action when clicking parent submit button
	registerOnSave?: (onSave: OnSaveCallback) => void;
	//Using to close modals not after first click on submit btn, but to handle closing
	handleClose?: () => void;
}

export interface IBaseModal {
	id: string;
	title: string;
	child: ReactElement<ISaveableChildProps>;
	btnText?: string;
	btnWithIcon?: boolean;
	shouldCloseOnSaving?: boolean;
	withSaveBtn?: boolean;
	onClose?: () => void;
}

export interface IModalInitialState {
	modals: IBaseModal[];
}

export const InitialModalState: IModalInitialState = {
	modals: [],
}

export interface IModalContextValue extends IModalInitialState {
	openModal: (modal: IBaseModal) => void;
	closeAllModals: () => void;
	closeModals: (count: number) => void;
}

export const ModalContext = createContext<IModalContextValue>({
	modals: InitialModalState.modals,
	openModal: () => {},
	closeAllModals: () => {},
	closeModals: () => {},
});

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}
	return context;
}