import React, {useEffect, useState} from 'react';
import PipelineItem from "@components/features/StartService/items/pipelineItem/PipelineItem.tsx";
import { IStepComponentProps } from "@components/layout/OnboardingLayout/onboardingLayoutTypes.ts";
import styles from "./PipelineStep.module.scss";
import { PIPELINES_ICON } from "@components/features/StartService/steps/1_PipelineStep/PipelineIcons.ts";
import {useInvestorStartService} from "@services/start/investorStartService.ts";
import {IPipelineResponse} from "@shared/investor/pipeline.ts";



const PipelineStep: React.FC<IStepComponentProps> = ({ onSubmit }) => {
    const { getAllPipelines, addInvestorPipelineStep }= useInvestorStartService();

    const [ pipeline, setPipeline ] = useState<IPipelineResponse[]>([]);

    useEffect(() => {
        getAllPipelines()
            .then(setPipeline)
            .catch(console.error);
    }, [ getAllPipelines ]);

    const handlePipelineSelect = (pipelineId: number) => {
        addInvestorPipelineStep(pipelineId)
            .then()
            .catch(console.error);
        onSubmit()
    }

    const renderPipelineItem = () => {
        return pipeline.map(p => (
             <PipelineItem title={ p.name }
                           subtitle={ p.description }
                           destiny={ p.goal }
                           id={ p.id }
                           onSubmit={ handlePipelineSelect }
                           icon={ PIPELINES_ICON[p.id - 1] }
                           mainTasks={ p.pipelineMainTasks }
                           key={ p.id } />))
    }

    return (
        <div className={ styles["list"] }>
            { renderPipelineItem() }
        </div>
    );
};

export default PipelineStep;