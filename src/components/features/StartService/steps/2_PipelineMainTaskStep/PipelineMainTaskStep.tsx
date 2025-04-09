import React, {useCallback, useState} from 'react';
import {ReactComponent as InfoIcon} from '@icons/named_exported/info_icon.svg';
import styles from './PipelineMainTaskStep.module.scss';
import pipeLineImageAdd from "@icons/start_service/adding_order_img.svg"
import StartServiceItemList from "@components/features/StartService/ui/StartServiceItemList/StartServiceItemList.tsx";
import StartServiceItem from "@components/features/StartService/ui/startServiceItem/StartServiceItem.tsx";
import {createDescriptionDate, createPipelineMainTaskRequest} from "@utils/investorServiceUtils.ts";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import StartServiceModalHead
    from "@components/features/StartService/ui/startServiceModalHead/StartServiceModalHead.tsx";
import {IStepComponentProps} from "@components/layout/OnboardingLayout/onboardingLayoutTypes.ts";
import {useInvestorStartService} from "@services/start/investorStartService.ts";
import {
    getLabelFromMonths
} from "@components/features/StartService/items/pipeline-main-task-modal/pipelineMainTaskDetails/PipelineMainTaskPeriodData.ts";
import {IMainTaskActivityRequest} from "@shared/investor/pipelineMainTask.ts";
import PipelineMainTaskModal
    from "@components/features/StartService/items/pipeline-main-task-modal/PipelineMainTaskModal.tsx";
import {
    IPipelineMainTaskItem
} from "@components/features/StartService/items/pipeline-main-task-modal/PipelineMainTaskModalTypes.ts";

const PipelineMainTaskStep: React.FC<IStepComponentProps> = ({ onSubmit }) => {
    const { addInvestorPipelineMainTask } = useInvestorStartService();

    const [ pipeLineMainTask, setPipeLineMainTask ] = useState<IPipelineMainTaskItem[]>([]);

    const { openModal } = useModal();

    const handleSubmit = () => {
        const request: IMainTaskActivityRequest[] = createPipelineMainTaskRequest(pipeLineMainTask);

        addInvestorPipelineMainTask(request)
                .then(onSubmit)
                .catch(console.error);
    }

    const onPipelineMainTaskAdd = () => {
        openModal({
            id: 'AddPipelineMainTask',
            title: (
                <StartServiceModalHead title={"Dodaj usługę"}/>
            ),
            child: <PipelineMainTaskModal mode={ 'add' }
                                          onSubmit={ handlePipelineMainTaskAdd }
                                          selectedMainTask={ pipeLineMainTask.map(item => item.mainTask.id!) }/>,
        });
    }

    const onPipelineMainTaskEdit = (item: IPipelineMainTaskItem) => {
        openModal({
            id: 'AddPipelineMainTask',
            title: (
                <StartServiceModalHead title={"Dodaj usługę"}/>
            ),
            child: <PipelineMainTaskModal mode={ 'edit' }
                                        onSubmit={ handleOrderEdit }
                                        currentOrder={ item }
                                        selectedMainTask={ pipeLineMainTask.map(item => item.mainTask.id!) }/>,
        });
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

    const renderPipelineMainTaskItems = useCallback (() => {
        return pipeLineMainTask!.map((item) =>
            <StartServiceItem title={ item.mainTask.name! }
                              description={ [ `${ item.amount }szt`,
                                       createDescriptionDate(item.startDate!, getLabelFromMonths(item.period!)) ] }
                              onDelete={ () => setPipeLineMainTask((mainTask) =>
                          mainTask.filter(task => task.mainTask.id !== item.mainTask.id)) }
                              onEdit={ () => onPipelineMainTaskEdit(item) }
                              key={ item.id }/>
    )}, [ pipeLineMainTask ]);

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
            <StartServiceItemList items={ renderPipelineMainTaskItems() } // todo StartServiceItemList
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

export default PipelineMainTaskStep;
