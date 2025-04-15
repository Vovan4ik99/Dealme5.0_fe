import React, {FC, useEffect, useState} from 'react';
import {useInvestorStartService} from "@services/start/useInvestorStartService.ts";
import {
    IAddPipelineMainTaskProps
} from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/addMainTaskActivity/AddMainTaskActivityTypes.ts";
import {IMainTask} from "@shared/start-service/investorStartServiceTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";
import styles from "./AddMainTaskActivity.module.scss";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";

const AddMainTaskActivity: FC<IAddPipelineMainTaskProps> = ({ currentMainTaskId, selectedMainTaskId, handleMainTaskSelect, currentPipeline }) => {
    const { getPipelineMainTasks, loadingStatus } = useInvestorStartService();

    const [ mainTasks, setMainTasks ] = useState<IMainTask[]>([]);

    useEffect(() => {
        getPipelineMainTasks(currentPipeline)
            .then(setMainTasks)
            .catch(console.error);
    }, [ getPipelineMainTasks ]);

    if (loadingStatus === 'loading') {
        return <LoadingSpinner />
    }

    const renderActivity = () => {
        return mainTasks
            .filter( (item) => item.id === currentMainTaskId || !selectedMainTaskId.includes(item.id) )
            .map((mainTask: IMainTask) =>
                    <OnboardingOption key={ mainTask.id }
                                      title={ mainTask.name }
                                      description={ mainTask.description }
                                      isActive={ mainTask.id === currentMainTaskId }
                                      hasHiddenDescription={ true }
                                      onClick={ () => handleMainTaskSelect(mainTask) }/>
            )
    }

    return (
        <div className={ styles["options"] }>
           { renderActivity() }
        </div>

    );
};

export default AddMainTaskActivity;
