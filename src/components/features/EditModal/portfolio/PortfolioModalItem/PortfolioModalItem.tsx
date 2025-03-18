import styles from "./PortfolioModalItem.module.scss";
import React from "react";
import {
	IPortfolioModalItemProps
} from "@components/features/EditModal/portfolio/PortfolioModalItem/portfolioModalItemTypes.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";

const PortfolioModalItem: React.FC<IPortfolioModalItemProps> = ({ picture, title, onEdit, onDelete }) => {

	return (
		<div className={ styles['portfolio'] }>
			<div className={ styles['portfolio__img'] }>
				<img src={ picture } alt={ 'portfolio item' }/>
			</div>
			<p className={ styles['portfolio__title'] }>{ title }</p>
			<div className={ styles['portfolio__actions'] }>
				<ActionBtn kind={ 'Edit' }
				           onClick={ onEdit }
				           withBorder={ true }
				           backgroundColor={ 'transparent' }/>
				<ActionBtn kind={ 'Delete' }
				           onClick={ onDelete }
				           withBorder={ true }
				           backgroundColor={ 'transparent' }/>
			</div>
		</div>
	);
};

export default PortfolioModalItem;