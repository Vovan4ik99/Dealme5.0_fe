import PipelineStep from "@components/features/StartService/steps/1_PipelineStep/PipelineStep.tsx";
import {IStepData} from "@components/layout/OnboardingLayout/onboardingLayoutTypes.ts";
import PipelineMainTaskStep from "@components/features/StartService/steps/2_PipelineMainTaskStep/PipelineMainTaskStep.tsx";
import ProductStep from "@components/features/StartService/steps/3_ProductStep/ProductStep.tsx";

export const START_SERVICE_STEPS: IStepData[] = [
    {
        subtitle: 'Wiem jakiej usługi potrzebuję',
        title: 'Na jakim etapie lejka sprzedażowego potrzebujesz wsparcia?',
        component: PipelineStep
    },
    {
        subtitle: 'Przygotowanie do sprzedaży',
        title: 'Jakich usług potrzebujesz?',
        component: PipelineMainTaskStep
    },
    {
        subtitle: 'Przygotowanie do sprzedaży',
        title: 'Jakie produkty sprzedajesz?',
        component: ProductStep
    },
] as const;