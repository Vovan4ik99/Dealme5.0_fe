import React, {useEffect, useState} from 'react';
import PipelineItem from "@components/features/investor-start-service/steps-components/1_PipelineStep/pipelineItem/PipelineItem.tsx";
import styles from "./PipelineStep.module.scss";
import { PIPELINES_ICON } from "@components/features/investor-start-service/steps-components/1_PipelineStep/PipelineIcons.ts";
import {useInvestorStartService} from "@services/start/useInvestorStartService.ts";
import {
    IStartServiceComponentProps
} from "@components/features/investor-start-service/ServiceManager/ServiceManagerTypes.ts";
import {IPipelineResponse} from "@shared/start-service/investorStartServiceTypes.ts";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";



const PipelineStep: React.FC<IStartServiceComponentProps> = ({ onSubmit }) => {
    const { getAllPipelines, addInvestorPipelineStep, loadingStatus }= useInvestorStartService();

    const [ pipeline, setPipeline ] = useState<IPipelineResponse[]>([]);

    useEffect(() => {
        getAllPipelines()
            .then(setPipeline)
            .catch(console.error);
    }, [ getAllPipelines ]);

    const handlePipelineSelect = (pipelineId: number) => {
        addInvestorPipelineStep(pipelineId)
            .then(onSubmit)
            .catch(console.error);
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

    if (loadingStatus === 'loading') {
        return <LoadingSpinner />
    }

    return (
        <div className={ styles["list"] }>
            { renderPipelineItem() }
        </div>
    );
};

export default PipelineStep;