import styles from "@ui/SelectOption/SelectOption.module.scss";
import React, { useState } from "react";
import { ISelectOptionProps } from "@ui/SelectOption/selectOptionTypes.ts";
import TooltipIcon from "@ui/TooltipIconBtn/TooltipIcon.tsx";

const SelectOption: React.FC<ISelectOptionProps> = ({ value, info, onClick, icon }) => {

	const [ isHover, setIsHover ] = useState<boolean>(false);

	return (
		<div
			onMouseEnter={ () => setIsHover(true) }
			onFocus={ () => setIsHover(true) }
			onMouseLeave={ () => setIsHover(false) }
			className={ `btn btn--more ${ styles["option"] }` }
			role="button"
			onClick={ onClick }
		>
			<div className={ styles["label"] }>
				{ icon }
				{ value }
			</div>
			{ info && <TooltipIcon text={ info } isLeft={ false } isActive={ isHover }/> }
		</div>
	);
}

export default SelectOption;