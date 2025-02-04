import React from "react";
import { ISubIndustriesItemProps } from "./subIndustriesItemTypes.ts";
import styles from "../SecondaryInfo.module.scss";
import cloud from '@icons/freelancer_profile/secondary_info/cloud.svg';
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { fitTextIntoBlock } from "@utils/textFitUtils.ts";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import SubIndustriesModalItem
	from "@components/features/EditModal/sub_industries/SubIndustriesModalItem/SubIndustriesModalItem.tsx";

const SubIndustriesItem: React.FC<ISubIndustriesItemProps> = ({ userSubIndustries, onSave }) => {

	const { openModal } = useModal();

	const getSubIndustriesNames = () => {
		const items: string[] = userSubIndustries.map(subIndustry => subIndustry.name);
		return fitTextIntoBlock(items, 240, 15, 18, 2);
	};

	const editSubIndustries = () => {
		openModal({
			id: 'SubIndustriesModalItem',
			title: 'Edytuj branże',
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			shouldCloseOnSaving: true,
			withSaveBtn: true,
			child: <SubIndustriesModalItem userSubIndustries={ userSubIndustries } onSave={ onSave }/>
		});
	};

	return (
		<>
			<div className={ styles['info__icon'] }>
				<img src={ cloud } alt="cloud"/>
			</div>
			<p>{ getSubIndustriesNames() }</p>
			<div className={ styles['info__btn'] }>
				<ActionBtn kind={ 'Edit' }
				           withBorder={ false }
				           backgroundColor={ 'transparent' }
				           onClick={ editSubIndustries }/>
			</div>
		</>
	);
};

export default SubIndustriesItem;