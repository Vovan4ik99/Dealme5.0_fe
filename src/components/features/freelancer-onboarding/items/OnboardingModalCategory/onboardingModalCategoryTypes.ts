import React from "react";

type ModalKind = "default" | "active" | "withIcon" | "withIconActive" | "finished";

export interface IOnboardingModalCategoryProps {
	kind: ModalKind;
	text: string;
	children?: React.ReactNode[] | React.ReactNode;
}