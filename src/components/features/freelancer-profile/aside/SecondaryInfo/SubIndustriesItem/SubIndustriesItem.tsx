import React from "react";
import { ISubIndustriesItemProps } from "./subIndustriesItemTypes.ts";
import styles from "../SecondaryInfo.module.scss";
import cloud from '@icons/freelancer_profile/secondary_info/cloud.svg';
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import { fitTextIntoBlock } from "@utils/textFitUtils.ts";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import SubIndustriesModalItem
	from "@components/features/modals/sub_industries/SubIndustriesModalItem/SubIndustriesModalItem.tsx";

const SubIndustriesItem: React.FC<ISubIndustriesItemProps> = ({ userSubIndustries, onSave, isLoggedUserProfile }) => {

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
			{ isLoggedUserProfile &&
                <div className={ styles['info__btn'] }>
                    <ActionBtn kind={ 'Edit' }
                               withBorder={ false }
                               backgroundColor={ 'transparent' }
                               onClick={ editSubIndustries }/>
                </div>
			}
		</>
	);
};

export default SubIndustriesItem;