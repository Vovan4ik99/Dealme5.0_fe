import styles from './SubIndustriesModalItem.module.scss';
import React, {useCallback, useEffect, useState} from "react";
import {ISubIndustriesModalItemProps} from "./subindustriesModalItemTypes.ts";
import SubIndustryModalItem from "./SubIndustryModalItem/SubIndustryModalItem.tsx";
import {useOnboardingService} from "@services/onboardingService.ts";
import {IIndustry, ISubIndustry} from "@shared/onboardingTypes.ts";
import DragAndDropContainer from "../DragAndDropContainer/DragAndDropContainer.tsx";
import {ReactComponent as AddIcon} from "@icons/named_exported/add_icon.svg";
import {ISubIndustriesEditPayload} from "@shared/modalPayloadTypes.ts";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import AddSubIndustriesModalItem from "@components/features/EditModal/AddSubIndustriesModalItem/AddSubIndustriesModalItem.tsx";

const SubIndustriesModalItem: React.FC<ISubIndustriesModalItemProps> = ({userSubIndustries, onSave, registerOnSave}) => {

	const {getIndustries, patchSubIndustries} = useOnboardingService();
	const {modals, openModal} = useModal();
	
	const [industries, setIndustries] = useState<IIndustry[]>([]);
	const [subIndustries, setSubIndustries] = useState<ISubIndustry[]>(userSubIndustries);

	const modal = modals.find(
		(modal) => modal.id === "subIndustriesEdit"
	) as { payload: ISubIndustriesEditPayload | undefined };

	const handleSave = useCallback(() => {
		patchSubIndustries(subIndustries.map(subIndustry => subIndustry.id))
			.then(() => onSave())
			.catch(console.error);
	}, [onSave, patchSubIndustries, subIndustries]);

	useEffect(() => {
		if (!registerOnSave) {
			console.error("registerOnSave is not defined");
			return;
		}
		registerOnSave(handleSave);
	}, [handleSave, registerOnSave]);

	useEffect(() => {
		if (industries.length > 0) return;
		getIndustries()
			.then(setIndustries)
			.catch(console.error);
	}, [getIndustries, industries.length, modal]);

	const addUniqueSubIndustries = (
		currentSubIndustries: ISubIndustry[],
		newSubIndustries: ISubIndustry[]
	): ISubIndustry[] => {
		const uniqueSubIndustries = newSubIndustries.filter(
			sub => !currentSubIndustries.some(existing => existing.id === sub.id)
		);
		return [...uniqueSubIndustries, ...currentSubIndustries];
	};

	useEffect(() => {
		if (!modal?.payload?.subIndustries) return;
		setSubIndustries(prevState =>
			addUniqueSubIndustries(prevState, modal.payload!.subIndustries)
		);
	}, [modal, userSubIndustries]);

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
			id: 'subIndustriesAdd',
			title: 'Dodaj branże',
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			shouldCloseOnSaving: true,
			child: <AddSubIndustriesModalItem industries={filteredIndustries} />
		});
	};

	return (
		<div className={styles['item']}>
			<DragAndDropContainer items={subIndustries} onItemsChange={handleItemsChange} renderItem={(subIndustry) => (
				<SubIndustryModalItem
					key={subIndustry.id}
					text={subIndustry.name}
					onDelete={() => handleItemDelete(subIndustry.id)}
					label={findIndustryNameBySubIndustryId(subIndustry.id) ?? 'Brak'}
				/>
			)}/>
			<button onClick={handleAddItem} className={`btn btn--more ${styles['item__btn']}`}>
				<AddIcon width={12} height={12}/>
				Dodaj kolejne branże
			</button>
		</div>
	);
}

export default SubIndustriesModalItem;