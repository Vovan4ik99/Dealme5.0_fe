export interface IOnboardingOptionProps {
	title: string;
	description?: string;
	onClick: () => void;
	isActive?: boolean;
	withTooltipIcon?: boolean;
	tooltipText?: string;
	withCheckboxInput?: boolean;
	titleAddText?: string;
	titleFontSize?: number;
	titleAddTextFontSize?: number;
	image?: string;
}