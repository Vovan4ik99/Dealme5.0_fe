import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import React, { useContext, useEffect, useState } from "react";
import styles from "./SalesTools.module.scss";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import SalesToolProfileItem
	from "@components/features/freelancer-profile/main/SalesTools/SalesToolProfileItem/SalesToolProfileItem.tsx";
import { getPictureForSalesTools } from "@utils/salesToolsUtils.ts";
import { ISalesTool } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import SalesToolsEditModalItem
	from "@components/features/modals/sales_tools/SalesToolsEditModalItem/SalesToolsEditModalItem.tsx";
import SalesToolsAddModalItem
	from "@components/features/modals/sales_tools/SalesToolsAddModalItem/SalesToolsAddModalItem.tsx";
import { ISalesToolsProps } from "@components/features/freelancer-profile/main/SalesTools/salesToolsTypes.ts";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";

const SalesTools: React.FC<ISalesToolsProps> = ({ freelancerId, isLoggedUserProfile }) => {

	const SECTION_ID: NavbarSectionKey = 'tools';

	const { user } = useContext(AuthContext);
	const { openModal } = useModal();
	const { patchSalesTools, getSalesTools } = useFreelancerOnboardingService();
	const { getFreelancerSalesTools } = useFreelancerProfileService();

	const [ currentIndex, setCurrentIndex ] = useState<number>(0);
	const [ allSalesTools, setAllSalesTools ] = useState<ISalesTool[]>([]);
	const [ selectedSalesTool, setSelectedSalesTool ] = useState<ISalesTool[]>([]);

	useEffect(() => {
		getFreelancerSalesTools(freelancerId)
			.then(setSelectedSalesTool)
			.catch(console.error);
	}, [ freelancerId, getFreelancerSalesTools ]);

	useEffect(() => {
		getSalesTools()
			.then(setAllSalesTools)
			.catch(console.error);
	}, [ getSalesTools ]);

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
		return allSalesTools.filter(tool => !selectedSalesTool
			.some(t => t.id === tool.id));
	};

	const renderSalesTools = () => {
		return selectedSalesTool.map(tool => {
			return <SalesToolProfileItem key={ tool.id }
			                             toolName={ tool.toolName }
			                             categoryName={ tool.kind }
			                             toolImg={ getPictureForSalesTools(tool.toolName) }/>
		});
	};

	const handleSalesToolsEdit = () => {
		openModal({
			id: 'SalesToolsEditModalItem',
			title: 'Edytuj narzędzia sprzedażowe',
			shouldCloseOnSaving: true,
			btnText: 'Zapisz zmiany',
			withSaveBtn: true,
			btnWithIcon: false,
			child: <SalesToolsEditModalItem
						allSalesTools={ allSalesTools }
						onSave={ onSalesToolsEdit }/>
		});
	};

	const onSalesToolsAdd = (newTools: ISalesTool[]) => {
		const request = [ ...selectedSalesTool, ...newTools ];

		patchSalesTools(request.map(tool => tool.id))
			.then(() => setSelectedSalesTool(request))
			.catch(console.error);
	};

	const onSalesToolsEdit = (salesTools: ISalesTool[]) => {
		patchSalesTools(salesTools.map(tool => tool.id))
			.then(() => setSelectedSalesTool(salesTools))
			.catch(console.error);
	}

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
				onSave = { onSalesToolsAdd }/>
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
						           disabled={ currentIndex + 5 >= selectedSalesTool.length }
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
                                   onClick={ handleSalesToolsEdit }/>
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