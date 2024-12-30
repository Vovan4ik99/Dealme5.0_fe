import {IModalInitialState} from "@context/ModalContext/ModalContext.ts";
import {ModalAction, ModalActions} from "@context/ModalContext/modalActions.ts";

export const modalReducer = (state: IModalInitialState, action: ModalAction): IModalInitialState => {
	switch (action.type) {
		case ModalActions.OPEN_MODAL:
			return {
				...state,
				modals: [...state.modals, {...action.payload}]
			};
		case ModalActions.CLOSE_MODALS:
			return {
				...state,
				modals: state.modals.slice(0, state.modals.length - (action.payload))
			};
		case ModalActions.CLOSE_ALL_MODALS:
			return {
				...state,
				modals: []
			};
		case ModalActions.UPDATE_MODAL_DATA:
			return {
				...state,
				modals: state.modals.map((modal) =>
					modal.id === action.payload.id
						? {...modal, payload: action.payload.data}
						: modal
				),
			};
		default:
			return state;
	}
}