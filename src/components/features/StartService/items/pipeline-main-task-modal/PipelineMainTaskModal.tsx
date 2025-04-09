import React, {FC, useContext, useRef, useState} from 'react';
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
import PipelineMainTaskDetails
    from "@components/features/StartService/items/pipeline-main-task-modal/pipelineMainTaskDetails/PipelineMainTaskDetails.tsx";
import {
    IPipelineMainTaskDetailsForm, IPipelineMainTaskDetailsRef
} from "@components/features/StartService/items/pipeline-main-task-modal/pipelineMainTaskDetails/PipelineMainTaskDetailsTypes.ts";
import {ModalContext} from "@context/ModalContext/ModalContext.ts";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";

const PipelineMainTaskModal: FC<IPipelineModalProps> = ({ selectedMainTask, mode, onSubmit, currentOrder }) => {
    const { closeModals } = useContext(ModalContext);

    const formRef = useRef<IPipelineMainTaskDetailsRef | null>(null);

    const [ order, setOrder ] = useState<IPipelineMainTaskItem>(currentOrder || orderRequestStartState);
    const [ currentStep, setCurrentStep ] = useState<number>(1);

    const handleOrderSave = (form: IPipelineMainTaskDetailsForm ) => {
        const request = { ...form, mainTask: order.mainTask };
        closeModals(1);

        if (mode === "add") {
            onSubmit(request);
            return;
        }

        onSubmit(request, currentOrder.id!);
    }

    const handleFormSubmit = () => {
        formRef.current?.submitForm();
    };

    const handleMainTaskEdit = (form: IPipelineMainTaskDetailsForm) => {
        setOrder(prev => {
            return { ...prev, ...form };
        });
        setCurrentStep(prev => --prev);
    }

    const handleMainTaskSelect = (mainTask: IMainTaskBaseInfo) => {
        setOrder(prev => {
            return { ...prev, mainTask: mainTask };
        });
        setCurrentStep(prev => ++prev);
    }

    const renderSteps = () => {
        return orderSteps.map(step => (
            <div className={`${styles["modal__tab"]} 
                              ${step.index === currentStep && styles["modal__tab--active"]}`}
                  key={step.index}>
                <div className={` ${ step.index < currentStep && styles["modal__tab-info"] } `}>
                    { step.index < currentStep &&  <SuccessIcon /> }
                    { `0${step.index}. ${step.title}` }
                </div>
            </div>
        ))
    }

    return (
        <div className={styles["modal"]}>
            <div className={ styles["modal__head"] }>
                { renderSteps() }
            </div>
            { currentStep === 1
                ? <AddPipelineMainTask currentMainTaskId={ order?.mainTask?.id }
                                     selectedMainTaskId={ selectedMainTask }
                                     handleMainTaskSelect={ handleMainTaskSelect }/>
                :
                <>
                    <PipelineMainTaskDetails orderDetails={ order }
                                             ref={ formRef }
                                             mainTaskName={ order.mainTask.name! }
                                             onSave={ handleOrderSave }
                                             onEdit={ handleMainTaskEdit }/>

                    <button className={`btn btn--withIcon ${styles["modal__btn"]}`} onClick={ handleFormSubmit }>
                        <AddIcon fill={'#fffff'}/>
                        <span>Dodaj usługę</span>
                    </button>
                </> }
        </div>
    );
};

export default PipelineMainTaskModal;
