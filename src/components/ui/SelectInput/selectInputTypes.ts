export interface ISelectItem {
	text: string;
	info: string | null;
}

export interface ISelectInputProps {
	labelText: string;
	text: string;
	additionalText?: string;
	onClick: (newValue: string) => void;
	selectItems: ISelectItem[];
}
