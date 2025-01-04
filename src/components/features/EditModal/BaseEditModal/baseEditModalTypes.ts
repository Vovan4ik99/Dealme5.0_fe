import {IBaseModal, ModalId} from "@context/ModalContext/ModalContext.ts";

export interface IBaseEditModalProps extends IBaseModal<ModalId> {
    onClose: () => void;
    offset: number;
    zIndex: number;
}

