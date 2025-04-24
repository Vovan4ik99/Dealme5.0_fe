import React, {FC, useContext, useRef, useState} from 'react';
import {
    IPipelineMainTaskItem,
    IPipelineModalProps
} from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/MainTaskActivityModalTypes.ts";
import styles from "./MainTaskActivityModal.module.scss";
import {ReactComponent as SuccessIcon} from "@icons/named_exported/start-service/success_icon.svg";
import {orderRequestStartState, orderSteps} from "@utils/investorServiceUtils.ts";
import AddMainTaskActivity
    from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/addMainTaskActivity/AddMainTaskActivity.tsx";
import {
    IMainTaskBaseInfo
} from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/addMainTaskActivity/AddMainTaskActivityTypes.ts";
import MainTaskActivityDetails
    from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/mainTaskActivityDetails/MainTaskActivityDetails.tsx";
import {
    IPipelineMainTaskDetailsForm, IPipelineMainTaskDetailsRef
} from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/mainTaskActivityDetails/MainTaskActivityDetailsTypes.ts";
import {ModalContext} from "@context/ModalContext/ModalContext.ts";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";

const MainTaskActivityModal: FC<IPipelineModalProps> = ({ selectedMainTask,
                                                          mode,
                                                          onSubmit,
                                                          currentOrder,
                                                          selectedPipeline }) => {
    const { closeModals } = useContext(ModalContext);

    const formRef = useRef<IPipelineMainTaskDetailsRef | null>(null);

    const [ order, setOrder ] = useState<IPipelineMainTaskItem>(currentOrder || orderRequestStartState);
    const [ currentStep, setCurrentStep ] = useState<number>(1);
    const [ isDisabled, setIsDisabled ] = useState<boolean>(true);

    const handleOrderSave = (form: IPipelineMainTaskDetailsForm ) => {
        const request = { ...form, pipelineMainTaskDTO: order.pipelineMainTaskDTO };
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
            return { ...prev, pipelineMainTaskDTO: mainTask };
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
                ? <AddMainTaskActivity currentPipeline={selectedPipeline}
                                       currentMainTaskId={ order?.pipelineMainTaskDTO?.id }
                                       selectedMainTaskId={ selectedMainTask }
                                       handleMainTaskSelect={ handleMainTaskSelect }/>
                :
                <>
                    <MainTaskActivityDetails orderDetails={ order }
                                             ref={ formRef }
                                             mainTaskName={ order.pipelineMainTaskDTO.name! }
                                             onSave={ handleOrderSave }
                                             isDisabled={ (value) => setIsDisabled(value) }
                                             onEdit={ handleMainTaskEdit }/>

                    <button className={ `btn btn--withIcon 
                                        ${styles["modal__btn"]}` }
                            disabled={ isDisabled }
                            onClick={ handleFormSubmit }>
                        <AddIcon fill={'#fffff'}/>
                        <span>{mode === 'add' ? "Dodaj usługę" : "Edytuj usługę"}</span>
                    </button>
                </> }
        </div>
    );
};

export default MainTaskActivityModal;
