import React, { useCallback, useMemo, useReducer } from "react";
import { modalReducer } from "@context/ModalContext/modalReducer.ts";
import {
	IBaseModal,
	IModalContextValue,
	InitialModalState,
	ModalContext,
} from "@context/ModalContext/ModalContext.ts";
import { ModalActions } from "@context/ModalContext/modalActions.ts";
import { createPortal } from "react-dom";
import ModalOverlay from "@components/features/modals/base/ModalOverlay/ModalOverlay.tsx";
import BaseEditModal from "@components/features/modals/base/BaseEditModal/BaseEditModal.tsx";

const baseZIndex = 1000;

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const [state, dispatch] = useReducer(modalReducer, InitialModalState);

	const openModal = useCallback((modal: IBaseModal) => {
		dispatch({type: ModalActions.OPEN_MODAL, payload: modal});
	}, []);

	const closeModals = useCallback((count: number) => {
		dispatch({type: ModalActions.CLOSE_MODALS, payload: count});
	}, []);

	const closeAllModals = useCallback(() => {
		dispatch({type: ModalActions.CLOSE_ALL_MODALS});
	}, []);

	const getOffset = (index: number) => {
		if (index === state.modals.length - 1) return 0;
		return -(state.modals.length - index - 1) * 50;
	};

	const getZIndex = (index: number) => {
		return baseZIndex + index + 1;
	};

	const value: IModalContextValue = useMemo(() => (
		{
			...state,
			openModal,
			closeModals,
			closeAllModals
		}
	), [closeAllModals, closeModals, openModal, state]);

	return (
		<ModalContext.Provider value={value}>
			{children}
			{createPortal(
				<>
					{state.modals.length > 0 && (
						<>
							<ModalOverlay zIndex={getZIndex(state.modals.length - 1)}/>
							{state.modals.map((modal, index) => (
								<BaseEditModal
									key={modal.id}
									{...modal}
									zIndex={getZIndex(index)}
									offset={getOffset(index)}
									onClose={() => {
										if (modal.onClose) {
											modal.onClose();
										}
										closeModals(1);
									}}
								/>
							))}
						</>
					)}
				</>,
				document.getElementById('modal-root')!
			)}
		</ModalContext.Provider>
	);
}