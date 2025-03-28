export interface IAddCompanyMailsProps {
	mails: string[];
	onChange: (mail: string, mailIndex: number) => void;
	isOpened: boolean;
}