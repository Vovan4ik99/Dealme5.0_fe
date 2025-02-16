import styles from "@ui/SelectInput/SelectOption/SelectOption.module.scss";
import React, {useState} from "react";
import {ISelectOptionProps} from "@ui/SelectInput/SelectOption/selectOptionTypes.ts";
import TooltipIcon from "@ui/TooltipIconBtn/TooltipIcon.tsx";

const SelectOption: React.FC<ISelectOptionProps> = ({value, info, onClick}) => {

	const [isHover, setIsHover] = useState<boolean>(false);

	return (
		<div
			onMouseEnter={() => setIsHover(true)}
			onFocus={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			className={styles['option']}
			role="button"
			onClick={onClick}
		>
			{value}
			{info && <TooltipIcon text={info} isLeft={false} isActive={isHover}/>}
		</div>
	);
}

export default SelectOption;