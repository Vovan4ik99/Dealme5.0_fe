export interface IAlertItemProps {
	kind: AlertKind;
	text: string;
}

type AlertKind = 'error' | 'success' | 'warning' | 'neutral' | 'info';