export interface IOnboardingOptionProps {
	title: string;
	description?: string;
	onClick: () => void;
	isActive?: boolean;
	withTooltipIcon?: boolean;
	tooltipText?: string;
}