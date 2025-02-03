import React, { useEffect, useState } from "react";
import {
	ISalesToolsListProps
} from "@entities/SalesToolsList/salesToolsListTypes.ts";
import OnboardingSearchBar
	from "@components/features/Onboarding/items/OnboardingSearchBar/OnboardingSearchBar.tsx";
import SalesToolKindItem
	from "@components/features/Onboarding/items/SalesToolKindItem/SalesToolKindItem.tsx";
import { getToolKindNameByKind } from "@utils/salesToolsUtils.ts";
import { ISalesTool } from "@shared/onboardingTypes.ts";
import styles from '../Entity.module.scss';

const SalesToolsList: React.FC<ISalesToolsListProps> = ({tools, selectedTools, onChange}) => {

	const [kindSalesToolsMap, setKindSalesToolsMap] = useState<Map<string, ISalesTool[]>>(new Map());
	const [filteredSalesTools, setFilteredSalesTools] = useState<ISalesTool[] | null>(null);

	useEffect(() => {
		setKindSalesToolsMap(groupByKind(tools));
	}, [tools]);

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
	};

	const renderKinds = () => {
		return Array.from(kindSalesToolsMap.keys()).map(kind => {
			return <SalesToolKindItem key={kind}
			                          text={getToolKindNameByKind(kind)}
			                          salesTools={getFilteredSalesTools(kind)}
			                          selectedSalesTools={selectedTools ?? []}
			                          onChange={onChange}
			                          isSearchActive={filteredSalesTools !== null}
			                          isInSearchRange={isKindInSearchRange(kind)}/>
		})
	};

	const onSearch = (searchStr: string) => {
		if (searchStr === '') {
			return setFilteredSalesTools(null);
		}
		const salesTools = Array.from(kindSalesToolsMap.values()).flatMap(tool => tool);
		setFilteredSalesTools(() => salesTools.filter(tool => {
			return tool.toolName.toLowerCase().includes(searchStr.toLowerCase());
		}));
	};

	return (
		<div className={styles['list']}>
			<OnboardingSearchBar onSearch={onSearch}/>
			{renderKinds()}
		</div>
	)
}

export default SalesToolsList;