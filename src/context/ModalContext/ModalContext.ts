import {createContext, ReactElement, ReactNode, useContext} from "react";

export type OnSaveCallback = () => void;

export interface ISaveableChildProps {
	//Allows to register action when clicking parent submit button
	registerOnSave?: (onSave: OnSaveCallback) => void;
	//Using to close modals not after first click on submit btn, but to handle closing
	handleClose?: () => void;
}

interface IBaseModalBase {
	id: string;
	title: string | ReactNode;
	child: ReactElement<ISaveableChildProps>;
	onClose?: () => void;
}

type IBaseModalWithSave = {
	withSaveBtn: true;
	btnText: string;
	btnWithIcon: boolean;
	shouldCloseOnSaving: boolean;
};

type IBaseModalWithoutSave = {
	withSaveBtn?: false;
	btnText?: never;
	btnWithIcon?: never;
	shouldCloseOnSaving?: never;
};

export type IBaseModal = IBaseModalBase & (IBaseModalWithSave | IBaseModalWithoutSave);

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