import { IBaseModal } from "@context/ModalContext/ModalContext.ts";

export type IBaseEditModalProps = IBaseModal & {
    onClose: () => void;
    offset: number;
    zIndex: number;
};


