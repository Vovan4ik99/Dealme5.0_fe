import React from "react";

export type IVideoItemProps = BaseProps &
	(CustomHoverProps | DefaultHoverProps) &
	(ActionableProps | NonActionableProps);

type BaseProps = {
	videoUrl: string;
	style?: React.CSSProperties;
	playVideo?: () => void;
};

type CustomHoverProps = {
	withCustomHover: true;
	isHoveredByParentBlock: boolean;
};

type DefaultHoverProps = {
	withCustomHover?: false;
	isHoveredByParentBlock?: never;
};

type ActionableProps = {
	hasEditBtn?: true;
	hasDeleteBtn?: true;
	onClick: () => void;
};

type NonActionableProps = {
	hasEditBtn?: false;
	hasDeleteBtn?: false;
	onClick?: never;
};



