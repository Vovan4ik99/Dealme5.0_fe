import {ReactNode} from "react";

export interface ISwitchBtnProps {
	onClick: (value: number) => void;
	currentIndex: number;
	items: ReactNode[];
}