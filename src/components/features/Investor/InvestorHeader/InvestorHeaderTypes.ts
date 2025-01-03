import { FC, SVGProps } from "react";

export interface IInvestorHeaderProps {
text: string,
title: string,
icon?: FC<SVGProps<SVGSVGElement>>;
onClick: () => void
}