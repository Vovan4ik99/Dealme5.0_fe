export interface IAboutMeTextAreaProps {
	label: string;
	maxSymbols: number;
	fontSize?: number;
	fontWeight?: number;
	placeholder: string;
	minHeight?: number;
	onTextChange: (text: string) => void;
	value: string;
}