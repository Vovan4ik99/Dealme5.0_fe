import React, {useCallback, useMemo, useReducer} from "react";
import {modalReducer} from "@context/ModalContext/modalReducer.ts";
import {
	IBaseModal,
	IModalContextValue,
	InitialModalState,
	ModalContext, ModalId
} from "@context/ModalContext/ModalContext.ts";
import {ModalActions} from "@context/ModalContext/modalActions.ts";
import {createPortal} from "react-dom";
import ModalOverlay from "@components/features/EditModal/base/ModalOverlay/ModalOverlay.tsx";
import BaseEditModal from "@components/features/EditModal/base/BaseEditModal/BaseEditModal.tsx";
import {ModalPayloads} from "@shared/modalPayloadTypes.ts";

const baseZIndex = 1000;

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const [state, dispatch] = useReducer(modalReducer, InitialModalState);

	const openModal = useCallback(<T extends ModalId>(modal: IBaseModal<T>) => {
		dispatch({type: ModalActions.OPEN_MODAL, payload: modal});
	}, []);

	const closeModals = useCallback((count: number) => {
		dispatch({type: ModalActions.CLOSE_MODALS, payload: count});
	}, []);

	const closeAllModals = useCallback(() => {
		dispatch({type: ModalActions.CLOSE_ALL_MODALS});
	}, []);

	const updateModalData = useCallback(<T extends ModalId>(id: T, data: ModalPayloads[T]) => {
		dispatch({ type: ModalActions.UPDATE_MODAL_DATA, payload: { id, data } });
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
			closeAllModals,
			updateModalData
		}
	), [closeAllModals, closeModals, openModal, state, updateModalData]);

	return (
		<ModalContext.Provider value={value}>
			{children}
			{createPortal(
				<>
					{state.modals.length > 0 && (
						<>
							<ModalOverlay zIndex={getZIndex(state.modals.length - 1)}/>
							{state.modals.map((modal, index) => (
								<BaseEditModal key={modal.id}
								               id={modal.id}
								               child={modal.child}
								               title={modal.title}
								               zIndex={getZIndex(index)}
								               btnText={modal.btnText}
								               btnWithIcon={modal.btnWithIcon}
								               offset={getOffset(index)}
								               shouldCloseOnSaving={modal.shouldCloseOnSaving}
								               onClose={() => closeModals(1)}>
								</BaseEditModal>
							))}
						</>
					)}
				</>,
				document.getElementById('modal-root')!
			)}
		</ModalContext.Provider>
	);
}