import {IInvestorData} from "@shared/investor/common.ts";

export interface IServiceSummaryPanelProps {
    navigate: (index: number) => void;
    userData: IInvestorData;
}