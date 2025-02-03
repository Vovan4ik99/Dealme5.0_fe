import React from "react";

export interface ISwitchBtnProps {
	onClick: () => void;
	isActive: boolean;
	leftContent: React.ReactNode;
	rightContent: React.ReactNode;
}