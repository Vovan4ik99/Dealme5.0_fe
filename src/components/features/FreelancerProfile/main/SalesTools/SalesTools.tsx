import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import React, { useContext, useEffect, useState } from "react";
import styles from "./SalesTools.module.scss";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import SalesToolProfileItem
	from "@components/features/FreelancerProfile/main/SalesTools/SalesToolProfileItem/SalesToolProfileItem.tsx";
import { getPictureForSalesTools } from "@utils/salesToolsUtils.ts";
import { ISalesTool } from "@shared/onboardingTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import SalesToolsEditModalItem
	from "@components/features/EditModal/sales_tools/SalesToolsEditModalItem/SalesToolsEditModalItem.tsx";
import SalesToolsAddModalItem
	from "@components/features/EditModal/sales_tools/SalesToolsAddModalItem/SalesToolsAddModalItem.tsx";
import { ISalesToolsProps } from "@components/features/FreelancerProfile/main/SalesTools/salesToolsTypes.ts";

const SalesTools: React.FC<ISalesToolsProps> = ({ freelancerId, isLoggedUserProfile }) => {

	const SECTION_ID: NavbarSectionKey = 'tools';

	const { user, getLoggedUserData } = useContext(AuthContext);
	const { openModal } = useModal();
	const { getSalesTools, patchSalesTools } = useFreelancerOnboardingService();

	const [ currentIndex, setCurrentIndex ] = useState<number>(0);
	const [ allSalesTools, setAllSalesTools ] = useState<ISalesTool[]>([]);

	useEffect(() => {
		getSalesTools(freelancerId)
			.then(setAllSalesTools)
			.catch(console.error);
	}, [ freelancerId, getSalesTools ]);

	if (!user) {
		return <></>;
	}

	const handleNavigateClick = (direction: 'left' | 'right') => {
		if (direction === 'left') {
			setCurrentIndex((prev) => prev - 1);
		} else {
			setCurrentIndex((prev) => prev + 1);
		}
	};

	const getSalesToolsToAdd = () => {
		return allSalesTools.filter(tool => !user.salesTools
			.some(t => t.id === tool.id));
	};

	const renderSalesTools = () => {
		return user.salesTools.map(tool => {
			return <SalesToolProfileItem key={ tool.id }
			                             toolName={ tool.toolName }
			                             categoryName={ tool.kind }
			                             toolImg={ getPictureForSalesTools(tool.toolName) }/>
		});
	};

	const onSalesToolsEdit = () => {
		openModal({
			id: 'SalesToolsEditModalItem',
			title: 'Edytuj narzędzia sprzedażowe',
			shouldCloseOnSaving: true,
			btnText: 'Zapisz zmiany',
			withSaveBtn: true,
			btnWithIcon: false,
			child: <SalesToolsEditModalItem/>
		});
	};

	const onSalesToolsAdd = (newTools: ISalesTool[]) => {
		patchSalesTools(newTools.map(tool => tool.id))
			.then(() => getLoggedUserData(localStorage.getItem('token')!))
			.catch(console.error);
	};

	const handleAddTools = () => {
		openModal({
			id: 'SalesToolsAddModalItem',
			title: 'Dodaj narzędzia sprzedażowe',
			shouldCloseOnSaving: true,
			btnText: 'Dodaj narzędzia sprzedażowe',
			btnWithIcon: true,
			withSaveBtn: true,
			child: <SalesToolsAddModalItem
				salesTools={ getSalesToolsToAdd() }
				onSave={ onSalesToolsAdd }/>
		});
	};

	return (
		<section className={ styles['tools'] } id={ SECTION_ID }>
			<div className={ styles['tools__header'] }>
				<div className={ styles['tools__heading'] }>
					<h2 className={ 'title title--profile' }>{ NAVBAR_SECTIONS[SECTION_ID] }</h2>
					<div className={ styles['tools__buttons'] }>
						<ActionBtn kind={ 'Navigate Left' }
						           key={ 'Left Btn' }
						           withBorder={ true }
						           backgroundColor={ 'white' }
						           disabled={ currentIndex === 0 }
						           onClick={ () => handleNavigateClick('left') }/>
						<ActionBtn kind={ 'Navigate Right' }
						           key={ 'Right Btn' }
						           withBorder={ true }
						           backgroundColor={ 'white' }
						           disabled={ currentIndex + 5 >= user.salesTools.length }
						           onClick={ () => handleNavigateClick('right') }/>
					</div>
				</div>
				{ isLoggedUserProfile &&
                    <div className={ styles['tools__buttons'] }>
                        <ActionBtn kind={ 'Add' }
                                   key={ 'Add' }
                                   withBorder={ true }
                                   backgroundColor={ 'white' }
                                   onClick={ handleAddTools }/>
                        <ActionBtn kind={ 'Edit' }
                                   key={ 'Edit' }
                                   withBorder={ true }
                                   backgroundColor={ 'white' }
                                   onClick={ onSalesToolsEdit }/>
                    </div>
				}
			</div>
			<div className={ styles['tools__content'] }>
				<div
					style={ {
						transform: `translateX(-${ currentIndex * (169 + 8) }px)`
					} }
					className={ styles['tools__inner'] }>
					{ renderSalesTools() }
				</div>
			</div>
		</section>
	);
};

export default SalesTools;