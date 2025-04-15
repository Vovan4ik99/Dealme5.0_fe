import PipelineStep from "@components/features/investor-start-service/steps-components/1_PipelineStep/PipelineStep.tsx";
import MainTaskActivityStep from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/MainTaskActivityStep.tsx";
import ProductStep from "@components/features/investor-start-service/steps-components/3_ProductStep/ProductStep.tsx";
import {IStartServiceStep} from "@components/features/investor-start-service/ServiceManager/ServiceManagerTypes.ts";
import StartServiceSummary from "@components/features/investor-start-service/steps-components/4_StartServiceSummary/StartServiceSummary.tsx";

export const INVESTOR_START_SERVICE_STEPS: IStartServiceStep[] = [
    {
        subtitle: 'Wiem jakiej usługi potrzebuję',
        title: 'Na jakim etapie lejka sprzedażowego potrzebujesz wsparcia?',
        component: PipelineStep
    },
    {
        subtitle: 'Przygotowanie do sprzedaży',
        title: 'Jakich usług potrzebujesz?',
        component: MainTaskActivityStep
    },
    {
        subtitle: 'Przygotowanie do sprzedaży',
        title: 'Jakie produkty sprzedajesz?',
        component: ProductStep
    },
    {
        subtitle: 'Dziękujemy za poświęcony czas.',
        title: 'Oto podsumowanie Twojego zlecenia.',
        component: StartServiceSummary
    }
] as const;
