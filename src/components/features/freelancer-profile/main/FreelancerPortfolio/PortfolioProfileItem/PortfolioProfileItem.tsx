import styles from './PortfolioProfileItem.module.scss';
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import React, { useState } from "react";
import {
	IPortfolioProfileItemProps
} from "@components/features/freelancer-profile/main/FreelancerPortfolio/PortfolioProfileItem/portfolioProfileItemTypes.ts";

const PortfolioProfileItem: React.FC<IPortfolioProfileItemProps> = ({
	                                                                    picture,
	                                                                    title,
	                                                                    comment,
	                                                                    onPreviewClick,
	                                                                    onEditClick
                                                                    }) => {

	const [ isHovered, setIsHovered ] = useState<boolean>(false);

	return (
		<div onMouseEnter={ () => setIsHovered(true) }
		     onMouseLeave={ () => setIsHovered(false) }
		     onClick={ onPreviewClick }
		     role={ 'button' }
		     className={ styles['item'] }>
			<div className={ styles['item__actions'] }>
				<ActionBtn kind={ 'Preview' }
				           withBorder={ false }
				           backgroundColor={ 'white' }
				           isHovered={ isHovered }
				           onClick={ onPreviewClick }/>
				<ActionBtn kind={ 'Edit' }
				           withBorder={ false }
				           backgroundColor={ 'white' }
				           onClick={ onEditClick }/>
			</div>
			<div className={ styles['item__img'] }>
				<img src={ picture } alt={ 'portfolio item' }/>
			</div>
			<p className={ styles['item__title'] }>{ title }</p>
			{ comment && <p className={ styles['item__description'] }>{ comment }</p> }
		</div>
	);
};

export default PortfolioProfileItem;