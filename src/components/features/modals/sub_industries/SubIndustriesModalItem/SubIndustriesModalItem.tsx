import styles from './SubIndustriesModalItem.module.scss';
import React, { useCallback, useEffect, useState } from "react";
import { ISubIndustriesModalItemProps } from "./subindustriesModalItemTypes.ts";
import SubIndustryModalItem
	from "@components/features/modals/sub_industries/SubIndustryModalItem/SubIndustryModalItem.tsx";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { IIndustry, ISubIndustry } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import DragAndDropContainer
	from "@components/features/modals/dragging/DragAndDropContainer/DragAndDropContainer.tsx";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import AddSubIndustriesModalItem
	from "@components/features/modals/sub_industries/AddSubIndustriesModalItem/AddSubIndustriesModalItem.tsx";

const SubIndustriesModalItem: React.FC<ISubIndustriesModalItemProps> = ({
	                                                                        userSubIndustries,
	                                                                        onSave,
	                                                                        registerOnSave
                                                                        }) => {

	const { getIndustries, patchSubIndustries } = useFreelancerOnboardingService();
	const { openModal } = useModal();

	const [ industries, setIndustries ] = useState<IIndustry[]>([]);
	const [ subIndustries, setSubIndustries ] = useState<ISubIndustry[]>(userSubIndustries);

	const handleSave = useCallback(() => {
		patchSubIndustries(subIndustries.map(subIndustry => subIndustry.id))
			.then(() => onSave())
			.catch(console.error);
	}, [ onSave, patchSubIndustries, subIndustries ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	useEffect(() => {
		if (industries.length > 0) return;
		getIndustries()
			.then(setIndustries)
			.catch(console.error);
	}, [ getIndustries, industries.length ]);

	const handleSubIndustriesAdd = (newSubIndustries: ISubIndustry[]) => {
		setSubIndustries(prevState => [ ...prevState, ...newSubIndustries ]);
	};

	const findIndustryNameBySubIndustryId = (subIndustryId: number): string | null => {
		for (const industry of industries) {
			const subIndustry = industry.subIndustries.find((sub) => sub.id === subIndustryId);
			if (subIndustry) {
				return industry.name;
			}
		}
		return null;
	};

	const handleItemsChange = (newItems: typeof subIndustries) => {
		setSubIndustries(newItems);
	};

	const handleItemDelete = (id: number) => {
		setSubIndustries(subIndustries.filter(subIndustry => subIndustry.id !== id));
	};

	const handleAddItem = () => {
		const userSubIndustryIds = subIndustries.map(sub => sub.id);

		const filteredIndustries = industries
			.map(industry => ({
				...industry,
				subIndustries: industry.subIndustries.filter(sub => !userSubIndustryIds.includes(sub.id)),
			}))
			.filter(industry => industry.subIndustries.length > 0);

		openModal({
			id: 'AddSubIndustriesModalItem',
			title: 'Dodaj branże',
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			withSaveBtn: true,
			shouldCloseOnSaving: true,
			child: <AddSubIndustriesModalItem industries={ filteredIndustries }
			                                  addSubIndustries={ handleSubIndustriesAdd }/>
		});
	};

	return (
		<div className={ styles['item'] }>
			<DragAndDropContainer items={ subIndustries } onItemsChange={ handleItemsChange }
			                      renderItem={ (subIndustry) => (
				                      <SubIndustryModalItem
					                      key={ subIndustry.id }
					                      text={ subIndustry.name }
					                      onDelete={ () => handleItemDelete(subIndustry.id) }
					                      label={ findIndustryNameBySubIndustryId(subIndustry.id) ?? 'Brak' }
				                      />
			                      ) }/>
			<button onClick={ handleAddItem } className={ 'btn btn--modal' }>
				<AddIcon width={ 12 } height={ 12 }/>
				Dodaj kolejne branże
			</button>
		</div>
	);
}

export default SubIndustriesModalItem;