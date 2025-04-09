import React, {FC, useState} from 'react';
import {
    IPipelineMainTaskItem,
    IPipelineModalProps
} from "@components/features/StartService/items/pipeline-main-task-modal/PipelineMainTaskModalTypes.ts";
import styles from "./PipelineMainTaskModal.module.scss";
import {ReactComponent as SuccessIcon} from "@icons/named_exported/start-service/success_icon.svg";
import {orderRequestStartState, orderSteps} from "@utils/investorServiceUtils.ts";
import AddPipelineMainTask
    from "@components/features/StartService/items/pipeline-main-task-modal/addPipelineMainTask/AddPipelineMainTask.tsx";
import {
    IMainTaskBaseInfo
} from "@components/features/StartService/items/pipeline-main-task-modal/addPipelineMainTask/AddPipelineMainTaskTypes.ts";

const PipelineMainTaskModal: FC<IPipelineModalProps> = ({ selectedMainTask, mode, onSubmit, currentOrder }) => {
    const [ currentStep, setCurrentStep ] = useState<number>(1);
    const [ order, setOrder ] = useState<IPipelineMainTaskItem>(currentOrder || orderRequestStartState);
    console.log(order);

    const handleOrderSave = (form: IPipelineMainTaskItem ) => {
        if (mode === "add") {
            onSubmit(form);
            return;
        }

        onSubmit(form, currentOrder.id!);
    }

    const handleMainTaskSelect = (mainTask: IMainTaskBaseInfo) => {
        setCurrentStep(prev => prev + 1);
        setOrder(prev => {
            return { ...prev, mainTask: mainTask };
        });
    }

    const renderSteps = () => {
        return orderSteps.map(step => (
            <div className={`${styles["modal__section"]} 
                              ${step.index === currentStep && styles["modal__section--active"]}`}
                  key={step.index}>
                <div className={` ${ step.index < currentStep && styles["modal__section-info"] } `}>
                    { step.index < currentStep &&  <SuccessIcon /> }
                    { `0${step.index}. ${step.title}` }
                </div>
            </div>
        ))
    }

    return (
        <div className={styles["modal"]}>
            <div className={ styles["modal__stepper"] }>
                { renderSteps() }
            </div>
            { currentStep === 1 ?
                <AddPipelineMainTask currentMainTaskId={ order?.mainTask?.id }
                                     selectedMainTaskId={ selectedMainTask }
                                     handleMainTaskSelect={ handleMainTaskSelect }/> : null
            }
        </div>
    );
};

export default PipelineMainTaskModal;
