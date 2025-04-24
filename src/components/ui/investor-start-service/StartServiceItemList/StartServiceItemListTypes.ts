import {ReactNode} from "react";

export interface IStartServiceItemListProps {
    items: ReactNode[];
    isLastPage: boolean;
    addingMoreBtn: string;
    boldEmptyInfo: string;
    emptyInfo: string;
    btnText: string;
    onEmptyImg: string;
    onAdd: () => void;
    onSubmit: () => void;
}