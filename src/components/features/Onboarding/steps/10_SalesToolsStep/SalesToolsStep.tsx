import React, {useEffect, useState} from "react";
import {ISalesToolsStepProps} from "./salesToolsTypes.ts";
import {useOnboardingService} from "@services/onboardingService.ts";
import {ISalesTool} from "@shared/onboardingTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import styles from "../../Onboarding.module.scss";
import OnboardingSearchBar from "../../items/OnboardingSearchBar/OnboardingSearchBar.tsx";
import InputError from "@ui/InputError/InputError.tsx";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import SalesToolKindItem from "../../items/SalesToolKindItem/SalesToolKindItem.tsx";

const SalesToolsStep: React.FC<ISalesToolsStepProps> = ({userTools, onNext}) => {

	const [kindSalesToolsMap, setKindSalesToolsMap] = useState<Map<string, ISalesTool[]>>(new Map());
	const [selectedSalesTools, setSelectedSalesTools] = useState<number[]>([]);
	const [filteredSalesTools, setFilteredSalesTools] = useState<ISalesTool[] | null>(null);

	const {errorMessage, loadingStatus, getSalesTools, patchSalesTools} = useOnboardingService();

	useEffect(() => {
		if (userTools.length > 0) {
			setSelectedSalesTools(userTools.map(tool => tool.id));
		}
	}, [userTools]);

	useEffect(() => {
		getSalesTools()
			.then(response => {
				setKindSalesToolsMap(groupByKind(response));
			}).catch(e => console.error(e));
	}, [getSalesTools]);

	const groupByKind = (tools: ISalesTool[]) => {
		return tools.reduce<Map<string, ISalesTool[]>>((map, tool) => {
			if (!map.has(tool.kind)) {
				map.set(tool.kind, []);
			}
			map.get(tool.kind)?.push(tool);
			return map;
		}, new Map());
	};

	const getFilteredSalesTools = (kind: string) => {
		if (filteredSalesTools === null) {
			return kindSalesToolsMap.get(kind) || [];
		}
		return kindSalesToolsMap.get(kind)?.filter(tool => filteredSalesTools.includes(tool)) || [];
	};

	const isKindInSearchRange = (kind: string) => {
		if (filteredSalesTools === null) {
			return false;
		}
		return filteredSalesTools.some(filteredTool => kindSalesToolsMap.get(kind)?.includes(filteredTool));
	}

	const onChange = (newSalesTool: number) => {
		setSelectedSalesTools(prevState => {
			return prevState?.includes(newSalesTool)
				? prevState?.filter(item => item !== newSalesTool)
				: [...prevState, newSalesTool];
		});
	}

	const onSearch = (searchStr: string) => {
		if (searchStr === '') {
			return setFilteredSalesTools(null);
		}
		const salesTools = Array.from(kindSalesToolsMap.values()).flatMap(tool => tool);
		setFilteredSalesTools(() => salesTools.filter(tool => {
			return tool.toolName.toLowerCase().includes(searchStr.toLowerCase());
		}));
	}

	const onSubmit = () => {
		if (selectedSalesTools.length > 0) {
			patchSalesTools(selectedSalesTools)
				.then(() => onNext())
				.catch(e => console.error(e));
		}
	}

	const getKindNameByKind = (kind: string) => {
		switch (kind) {
			case 'COLD_MAILING':
				return 'Cold mailing';
			case 'PROSPECTING':
				return 'Prospecting';
			case 'AUTOMATYZACJA_MARKETINGU':
				return 'Automatyzacja marketingu';
			case 'COLD_CALLING':
				return 'Cold calling';
			case 'ANALITYKA':
				return 'Analityka';
			case 'ZARZADZANIE_PROJEKTAMI':
				return 'Zarządzanie projektami / zadaniami';
			case 'NEWSLETTER':
				return 'Newsletter';
			case 'INNE':
				return 'Inne narzędzia wspierające sprzedaż';
			default:
				return kind;
		}
	}

	const renderKinds = () => {
		if (loadingStatus === 'idle') {
			return Array.from(kindSalesToolsMap.keys()).map(kind => {
				return <SalesToolKindItem key={kind}
				                          text={getKindNameByKind(kind)}
				                          salesTools={getFilteredSalesTools(kind)}
				                          selectedSalesTools={selectedSalesTools}
				                          onChange={onChange}
				                          isSearchActive={filteredSalesTools !== null}
				                          isInSearchRange={isKindInSearchRange(kind)}/>
			})
		}
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={'title title--fs40'}>Z jakich narzedzi sprzedażowych korzystałeś?</h1>
			<div className={styles['onboarding-step__categories']}>
				<OnboardingSearchBar onSearch={onSearch}/>
				{renderKinds()}
			</div>
			<button disabled={selectedSalesTools.length === 0}
			        onClick={() => onSubmit()}
			        className={'btn'}>Przejdż dalej
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</AnimatedStep>
	);
}

export default SalesToolsStep;