import React from "react";

export interface IOnboardingCategoryItemProps {
	text: string;
	categoryContent: React.ReactNode;
	isActive?: boolean;
}