import {IStepData} from "@components/layout/OnboardingLayout/onboardingLayoutTypes.ts";
import PipelineStep from "@components/features/StartService/steps/PipelineStep/PipelineStep.tsx";

export const START_SERVICE_STEPS: IStepData[] = [
    {
        title: 'Na jakim etapie lejka sprzedażowego potrzebujesz wsparcia?',
        subtitle: 'Wiem jakiej usługi potrzebuję',
        component: PipelineStep,
    },
] as const;