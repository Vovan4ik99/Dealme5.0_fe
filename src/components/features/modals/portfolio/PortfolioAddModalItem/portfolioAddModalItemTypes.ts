import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";
import { IFreelancerPortfolio, IFreelancerPortfolioUpdateRequest } from "@shared/freelancer/portfolio.ts";

export interface IPortfolioForm {
	title: string;
	info: string;
	picture?: Blob;
	filename?: string;
}

interface IPortfolioBaseModalItem extends ISaveableChildProps {
	isEdit: boolean;
	onSave?: (portfolio: FormData) => void;
	onPatch?: (portfolio: IFreelancerPortfolioUpdateRequest) => void;
	portfolio?: IFreelancerPortfolio;
}

interface IPortfolioAddModalItem extends IPortfolioBaseModalItem {
	isEdit: false;
	onSave: (portfolio: FormData) => void;
	portfolio?: never;
	onPatch?: never;
}

interface IPortfolioEditModalItem extends IPortfolioBaseModalItem {
	isEdit: true;
	onPatch: (portfolio: IFreelancerPortfolioUpdateRequest) => void;
	portfolio: IFreelancerPortfolio;
	onSave?: never;

}

export type IPortfolioAddModalItemProps = IPortfolioAddModalItem | IPortfolioEditModalItem;