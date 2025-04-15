import { IProductItem} from "@shared/start-service/investorStartServiceTypes.ts";
import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";

export type FormKeys = "name" | "subIndustry" | "description" | "sector" |
    "companySize" | "buyerPerson" | "additionalNotes" | "country"| "city" | "state" ;

export type AreaKeys = "Kraj" | "Województwo" | "Miasto";

export interface ICompanySizeItem {
    name: string;
    description: string;
    target: string;
}

export interface ISectorItem {
    id: number;
    name: string;
    description: string;
}

export interface ISubIndustryItem {
    id: number;
    name: string;
    info: string;
}

export interface IStateItem {
    state: string;
    description: string;
}

interface IAddProductProps extends ISaveableChildProps {
    mode: 'add';
    onSubmit: (product: IProductItem) => void;
    currentProduct?: never;
}

export interface IEditProductProps extends ISaveableChildProps {
    mode: 'edit';
    onSubmit: (product: IProductItem, id: number) => void;
    currentProduct: IProductItem;
}

export type IProductModalProps = ISaveableChildProps & (IAddProductProps | IEditProductProps )