import PipelineStep from "@components/features/StartService/steps/PipelineStep/PipelineStep.tsx";
import {IStepData} from "@components/layout/OnboardingLayout/onboardingLayoutTypes.ts";

export const START_SERVICE_STEPS: IStepData[] = [
    {
        subtitle: 'Wiem jakiej usługi potrzebuję',
        title: 'Na jakim etapie lejka sprzedażowego potrzebujesz wsparcia?',
        component: PipelineStep
    },
    {
        subtitle: 'Przygotowanie do sprzedaży',
        title: 'Jakich usług potrzebujesz?',
        component: undefined
    },
] as const;