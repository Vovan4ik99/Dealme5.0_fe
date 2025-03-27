import React from 'react';
import PipelineItem from "@components/features/StartService/items/PipelineItem/PipelineItem.tsx";
import {IStepComponentProps} from "@components/layout/OnboardingLayout/onboardingLayoutTypes.ts";
import styles from "./PipelineStep.module.scss";
import {IPipelineItem} from "@components/features/StartService/items/PipelineItem/PipelineItemTypes.ts";
import {ReactComponent as ProjectionScreen} from "@icons/named_exported/start-service/projection_screen.svg";


const PipelineStep: React.FC<IStepComponentProps> = ({ onSubmit }) => {

    const pipelines: IPipelineItem[] = [
        { pipelineId: 1,
            title: 'Przygotowanie do sprzedaży',
            subtitle: 'lorem',
            destiny: 'Stworzenie fundamentów sprzedaży poprzez opracowanie strategii wejścia na rynek, identyfikację kluczowych rynków docelowych oraz ustalenie spójnych procesów, które pozwolą na skuteczne docieranie do klientów.',
            icon: <ProjectionScreen/> },

        {   pipelineId: 2,
            title: 'Wsparcie IT dla sprzedaży',
            subtitle: 'lorem',
            destiny: 'Stworzenie fundamentów sprzedaży poprzez opracowanie strategii wejścia na rynek, identyfikację kluczowych rynków docelowych oraz ustalenie spójnych procesów, które pozwolą na skuteczne docieranie do klientów.',
            icon:  <ProjectionScreen />},
        {   pipelineId: 3,
            title: 'Wsparcie sprzedaży: generowanie leadów i zainteresowania',
            subtitle: 'lorem',
            destiny: 'Stworzenie fundamentów sprzedaży poprzez opracowanie strategii wejścia na rynek, identyfikację kluczowych rynków docelowych oraz ustalenie spójnych procesów, które pozwolą na skuteczne docieranie do klientów.',
            icon: <ProjectionScreen /> },
        {   pipelineId: 4,
            title: 'Podgrzewanie i kwalifikacja leadów',
            subtitle: 'lorem',
            destiny: 'Stworzenie fundamentów sprzedaży poprzez opracowanie strategii wejścia na rynek, identyfikację kluczowych rynków docelowych oraz ustalenie spójnych procesów, które pozwolą na skuteczne docieranie do klientów.',
            icon:  <ProjectionScreen /> },
        {   pipelineId: 5,
            title: 'Prowadzenie procesu sprzedaży',
            subtitle: 'lorem',
            destiny: 'Stworzenie fundamentów sprzedaży poprzez opracowanie strategii wejścia na rynek, identyfikację kluczowych rynków docelowych oraz ustalenie spójnych procesów, które pozwolą na skuteczne docieranie do klientów.',
            icon:  <ProjectionScreen /> },
    ]

    const renderPipelineItem = () => {
        return pipelines.map(pipeline => (
             <PipelineItem pipelineId={pipeline.pipelineId}
                          title={ pipeline.title }
                          subtitle={ pipeline.subtitle }
                          destiny={ pipeline.destiny }
                          onSubmit={ onSubmit }
                          icon={ pipeline.icon }
                          key={ pipeline.pipelineId } />))
    }

    return (
        <div className={ styles["list"]}>
            { renderPipelineItem() }
        </div>
    );
};

export default PipelineStep;