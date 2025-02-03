export interface IAlertItemProps {
	kind: AlertKind;
	text: string;
	hasMarginTop?: boolean;
}

type AlertKind = 'error' | 'success' | 'warning' | 'neutral' | 'info';