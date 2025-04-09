import React, {FC, useEffect, useState} from 'react';
import {useInvestorStartService} from "@services/start/investorStartService.ts";
import {IMainTask} from "@shared/investor/pipeline.ts";
import {
    IAddPipelineMainTaskProps
} from "@components/features/StartService/items/pipeline-main-task-modal/addPipelineMainTask/AddPipelineMainTaskTypes.ts";


const AddPipelineMainTask: FC<IAddPipelineMainTaskProps> = ({ currentMainTaskId, selectedMainTaskId, handleMainTaskSelect }) => {
    const { getPipelineMainTasks } = useInvestorStartService();

    const [ mainTasks, setMainTasks ] = useState<IMainTask[]>([]);

    // todo after merge with onboarding feature get mainTaskId from me
    useEffect(() => {
        getPipelineMainTasks(3)
            .then(setMainTasks)
            .catch(console.error);
    }, [ getPipelineMainTasks ]);

    // todo after merge with onboarding feature change component
    const renderActivity = () => {
        return mainTasks
            .filter( (item) => item.id === currentMainTaskId || !selectedMainTaskId.includes(item.id) )
            .map((mainTask: IMainTask) =>
                <button className={'btn'}
                        onClick={ () => handleMainTaskSelect(mainTask) }
                        key={ mainTask.id }>
                    { mainTask.name }
                </button>
            )
    }

    return (
        <>
           { renderActivity() }
        </>

    );
};

export default AddPipelineMainTask;
