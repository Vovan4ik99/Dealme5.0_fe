import React from 'react';
import PipelineItem from "@components/features/StartService/items/PipelineItem/PipelineItem.tsx";
import { IStepComponentProps } from "@components/layout/OnboardingLayout/onboardingLayoutTypes.ts";
import styles from "./PipelineStep.module.scss";

const PipelineStep: React.FC<IStepComponentProps> = ({ onSubmit }) => {
    return (
        <div className={ styles["list"]}>
            <PipelineItem />
        </div>
    );
};

export default PipelineStep;
