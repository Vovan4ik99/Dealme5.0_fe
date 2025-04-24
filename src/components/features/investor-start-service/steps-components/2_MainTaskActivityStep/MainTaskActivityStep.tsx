import React, {useCallback, useEffect, useState} from 'react';
import {ReactComponent as InfoIcon} from '@icons/named_exported/info_icon.svg';
import styles from './MainTaskActivityStep.module.scss';
import pipeLineImageAdd from "@icons/start_service/adding_order_img.svg"
import StartServiceItemList from "@ui/investor-start-service/StartServiceItemList/StartServiceItemList.tsx";
import StartServiceItem from "@ui/investor-start-service/StartServiceItem/StartServiceItem.tsx";
import {createDescriptionDate, createPipelineMainTaskRequest} from "@utils/investorServiceUtils.ts";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import StartServiceModalHead from "@ui/investor-start-service/StartServiceModalHead/StartServiceModalHead.tsx";
import {useInvestorStartService} from "@services/start/useInvestorStartService.ts";
import {
    getLabelFromMonths
} from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/mainTaskActivityDetails/MainTaskActivityPeriodData.ts";
import MainTaskActivityModal
    from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/MainTaskActivityModal.tsx";
import {
    IPipelineMainTaskItem
} from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/MainTaskActivityModalTypes.ts";
import {IMainTaskActivityRequest} from "@shared/start-service/investorStartServiceTypes.ts";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";
import {
    IStartServiceComponentProps
} from "@components/features/investor-start-service/ServiceManager/ServiceManagerTypes.ts";

const MainTaskActivityStep: React.FC<IStartServiceComponentProps> = ({ onSubmit, userData }) => {
    const { addInvestorMainTaskActivity, loadingStatus } = useInvestorStartService();

    const [ pipeLineMainTask, setPipeLineMainTask ] = useState<IPipelineMainTaskItem[]>([]);
    const { openModal } = useModal();

    useEffect(() => {
        if (userData?.pipelineSupportStage?.pipelineSupportMainTaskActivityDTOS) {
            setPipeLineMainTask(userData.pipelineSupportStage.pipelineSupportMainTaskActivityDTOS);
        }
    }, [userData]);

    const handleSubmit = () => {
        const data: IMainTaskActivityRequest[] = createPipelineMainTaskRequest(pipeLineMainTask);

        const existingIds = userData?.pipelineSupportStage?.pipelineSupportMainTaskActivityDTOS
                                               .map((item) => item.pipelineMainTaskDTO.id) ?? [];
        const request = data.filter(act => !existingIds.includes(act.pipelineMainTaskId));

        if (request.length === 0) {
            onSubmit();
            return;
        }
        addInvestorMainTaskActivity(data)
                .then(onSubmit)
                .catch(console.error);
    }

    const handlePipelineMainTaskAdd = (order: IPipelineMainTaskItem) => {
        const currentIndex = pipeLineMainTask.length !== 0 ? pipeLineMainTask[pipeLineMainTask.length - 1].id! + 1 : 1;

        setPipeLineMainTask(prev => [ ...prev, { ...order, id: currentIndex } ]);
    }

    const handleOrderEdit = (order: IPipelineMainTaskItem, orderId: number) => {
        setPipeLineMainTask(prev =>
            prev.map(ord =>
                ord.id === orderId ? { id: orderId, ...order } : ord
            )
        )
    }

    const onPipelineMainTaskAdd = () => {
        openModal({
            id: 'AddPipelineMainTaskAdd',
            title: (
                <StartServiceModalHead title={"Dodaj usługę"}/>
            ),
            child: <MainTaskActivityModal mode={ 'add' }
                                          onSubmit={ handlePipelineMainTaskAdd }
                                          selectedPipeline={userData.pipelineSupportStage.pipelineDTO.id}
                                          selectedMainTask={ pipeLineMainTask.map(item => item.pipelineMainTaskDTO.id!) }/>,
        });
    }

    const onPipelineMainTaskEdit = (item: IPipelineMainTaskItem) => {
        openModal({
            id: 'AddPipelineMainTaskEdit',
            title: (
                <StartServiceModalHead title={ "Edytuj usługę" }/>
            ),
            child: <MainTaskActivityModal mode={ 'edit' }
                                          selectedPipeline={userData.pipelineSupportStage.pipelineDTO.id}
                                          onSubmit={ handleOrderEdit }
                                          currentOrder={ item }
                                          selectedMainTask={ pipeLineMainTask.map(item => item.pipelineMainTaskDTO.id!) }/>
        });
    }

    const renderPipelineMainTaskItems = useCallback (() => {
        return pipeLineMainTask!.map((item) =>
            <StartServiceItem title={ item.pipelineMainTaskDTO.name! }
                              description={ [ `${ item.amount }szt`,
                                       createDescriptionDate(item.startDate!, getLabelFromMonths(item.period!)) ] }
                              onDelete={ () => setPipeLineMainTask((mainTask) =>
                                        mainTask.filter(task => task.pipelineMainTaskDTO.id !== item.pipelineMainTaskDTO.id)) }
                              onEdit={ () => onPipelineMainTaskEdit(item) }
                              key={ item.id }/>
    )}, [ pipeLineMainTask ]);

    if (loadingStatus === 'loading') {
        return <LoadingSpinner />
    }

    return (
        <main>
            <div className={ styles["step__head"] }>
                <h2 className={ styles["step__title"] }>
                    W poprzednim kroku wybrałeś etap lejka. Teraz sprecyzuj jakiego dokładnie wsparcia potrzebujesz
                </h2>
                <div className={ styles["step__tip"] }>
                    <InfoIcon/>
                    <p>
                        Pamiętaj: dane które teraz podasz zostaną zapisane na twoim koncie i będziesz mógł je wykorzystać
                    </p>
                </div>
            </div>
            <StartServiceItemList items={ renderPipelineMainTaskItems() }
                                  isLastPage={ false }
                                  addingMoreBtn={ "Dodaj kolejną usługę" }
                                  boldEmptyInfo={ "Nie masz jeszcze dodanych usług." }
                                  btnText={ "Dodaj usługę" }
                                  emptyInfo={ "Zdefinuj usługi aby przejdź dalej" }
                                  onEmptyImg={ pipeLineImageAdd }
                                  onAdd={ onPipelineMainTaskAdd }
                                  onSubmit={ handleSubmit }/>
        </main>
   );

};

export default MainTaskActivityStep;
