export interface IOnboardingOptionProps {
	title: string;
	description?: string;
	onClick: () => void;
	isActive?: boolean;
	withTooltipIcon?: boolean;
	tooltipText?: string;
	hasHiddenDescription?: boolean;
	withCheckboxInput?: boolean;
	titleAddText?: string;
	titleFontSize?: number;
	titleAddTextFontSize?: number;
	image?: string;
}