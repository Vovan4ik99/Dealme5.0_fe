import {
    IBuyerPersonResponse,
    IMainTaskActivityRequest,
    IProductItem
} from "@shared/start-service/investorStartServiceTypes.ts";
import {
    IModalStep,
    IPipelineMainTaskItem
} from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/MainTaskActivityModalTypes.ts";
import {IInvestorData} from "@shared/investor/common.ts";
import {
    AreaKeys,
    ICompanySizeItem,
    ISectorItem, IStateItem, ISubIndustryItem
} from "@components/features/investor-start-service/steps-components/3_ProductStep/product-modal/ProductModalTypes.ts";

export const getStartServiceStep = (userData: IInvestorData): number=> {
        if (userData?.pipelineSupportStage?.pipelineDTO == null) {
            return 0
        }
        if (userData.pipelineSupportStage?.pipelineSupportMainTaskActivityDTOS.length === 0) {
            return 1;
        }
        if (!userData?.products) {
            return 2;
        }
        return 3;
}

const formatDateToDDMMYYYY = (raw: Date) => {
    const cleaned = `${raw}`
    const date = new Date(cleaned);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

export const createDescriptionDate = (start: Date, period: string) => {
    const monthsMatch = period.match(/\d+/);
    const months = monthsMatch ? parseInt(monthsMatch[0], 10) : 0;

    const end = new Date(start);
    end.setMonth(end.getMonth() + months);

    return `${months} ${pluralizeMonth(months)} (${formatDateToDDMMYYYY(start)}–${formatDateToDDMMYYYY(end)})`;
};

const pluralizeMonth = (count: number) => {
    if (count === 1) return "miesiąc";
    if (count >= 2 && count <= 4) return "miesiące";
    return "miesięcy";
};


export const orderSteps: IModalStep[] = [
    { index: 1 ,title: "Wybierz usługę" },
    { index: 2 ,title: "Określ szczegóły" }
]

export const orderRequestStartState: IPipelineMainTaskItem= {
    id: undefined,
    pipelineMainTaskDTO: {
        id: undefined,
        name: undefined,
    },
    amount: undefined,
    description: undefined,
    period: undefined,
    startDate: undefined
}

export const createPipelineMainTaskRequest = (formData: IPipelineMainTaskItem[]):  IMainTaskActivityRequest[] => {
    return formData.map(ord => ({
        amount: ord.amount!,
        startDate: ord.startDate!,
        period: ord.period!,
        description: ord.description!,
        pipelineMainTaskId: ord.pipelineMainTaskDTO.id!,
    }))
}

export const getSectorsSelects = (sectors: ISectorItem[]) => {
    return sectors?.map(sector => {
        return {
            text: sector.name,
            info: sector.description
        }
    })
}
export const getCompanySizeSelects = (companySizes: ICompanySizeItem[]) => {
    return companySizes?.map(size => {
        return {
            text: size.description,
            info: size.target
        }
    })
}

export const getSubIndustriesSelects = (subIndustries: ISubIndustryItem[]) => {
    return subIndustries?.map(subIndustry => {
        return {
            text: subIndustry.name,
            info: subIndustry.info
        }
    })
}

export const getBuyerPersonSelects = (buyerPersons: IBuyerPersonResponse[]) => {
    return buyerPersons?.map(person => {
        return {
            text: person.name,
            info: null
        }
    })
}

export const getSelectedStates = (states: IStateItem[]) => {
    return states.map(state => {
        return {
            text: state.description,
            info: null,
        }
    })
}

export const AREA_VALUES: AreaKeys[] = ["Kraj", "Województwo", "Miasto"];

export const areaKeyToFormKey = (key: AreaKeys) => {
    if (key === "Kraj") {
        return "country";
    }
    if (key === "Województwo") {
        return "state";
    }
    return "city";
}

export const currentAreaSwitch = (currentProduct?: IProductItem): AreaKeys => {
    if (currentProduct?.city) {
        return "Miasto"
    }
    if (currentProduct?.state) {
        return "Województwo"
    }

    return "Kraj";
}

export const getCurrentAreaIndex = (area: string) => {
    if (area === "Kraj") {
        return 0;
    }
    if (area === "Województwo") {
        return 1;
    }
    return 2;
}

export const prePareProductResponse = (userData: IInvestorData): IProductItem[] => {
    if(!userData?.products) return [];
    return userData.products.map(product => {
        return {
            id: product.id,
            name: product.name,
            subIndustry: product.subIndustry.name,
            description: product?.description,
            sector: product.sectors.map(s => s.name),
            companySize: product.companySize.map(s => s.description),
            buyerPerson: product.buyerPersons.map(s => s.name),
            additionalNotes: product?.additionalNotes,
            country: product?.country,
            state: product?.state,
            city: product?.city,
        }
    })
}