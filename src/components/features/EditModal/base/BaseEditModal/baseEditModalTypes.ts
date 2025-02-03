import { IBaseModal } from "@context/ModalContext/ModalContext.ts";

export interface IBaseEditModalProps extends IBaseModal {
    onClose: () => void;
    offset: number;
    zIndex: number;
}

