import React from 'react';
import PipelineItem from "@components/features/StartService/items/PipelineItem/PipelineItem.tsx";
import { IStepComponentProps } from "@components/layout/OnboardingLayout/onboardingLayoutTypes.ts";
import styles from "./PipelineStep.module.scss";
import { PIPELINES } from "@components/features/StartService/steps/PipelineStep/PipelineItemFakeData.ts";


const PipelineStep: React.FC<IStepComponentProps> = ({ onSubmit }) => {

    const renderPipelineItem = () => {
        return PIPELINES.map(pipeline => (
             <PipelineItem title={ pipeline.title }
                          subtitle={ pipeline.subtitle }
                          destiny={ pipeline.destiny }
                          onSubmit={ onSubmit }
                          icon={ pipeline.icon }
                          key={ pipeline.title } />))
    }

    return (
        <div className={ styles["list"]}>
            { renderPipelineItem() }
        </div>
    );
};

export default PipelineStep;