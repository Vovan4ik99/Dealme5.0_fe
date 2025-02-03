import styles from "./SalesToolProfileItem.module.scss";
import React from "react";
import { ISalesToolProfileItemProps } from "./salesToolProfileItemTypes.ts";
import { getToolKindNameByKind } from "@utils/salesToolsUtils.ts";

const SalesToolProfileItem: React.FC<ISalesToolProfileItemProps> = ({
	                                                                    toolName,
	                                                                    toolImg,
	                                                                    categoryName
                                                                    }) => {

	return (
		<div className={ styles['tool'] }>
			<div className={ styles['tool__img'] }>
				{ toolImg && <img src={ toolImg } alt={ toolName }/> }
			</div>
			<div className={ styles['tool__info'] }>
				<p className={ styles['tool__category'] }>{ getToolKindNameByKind(categoryName) }</p>
				<p className={ styles['tool__name'] }>{ toolName }</p>
			</div>
		</div>
	);
};

export default SalesToolProfileItem;