import React, {FC} from 'react';
import styles from './ServiceSummaryPanel.module.scss';
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import StartServiceDescription from "@ui/investor-start-service/StartServiceDescription/StartServiceDescription.tsx";
import {
    IServiceSummaryPanelProps
} from "@components/features/investor-start-service/steps-components/4_StartServiceSummary/ServiceSummaryPanel/ServiceSummaryPanelTypes.ts";
import {createDescriptionDate} from "@utils/investorServiceUtils.ts";
import {
    getLabelFromMonths
} from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/mainTaskActivityDetails/MainTaskActivityPeriodData.ts";

const ServiceSummaryPanel: FC<IServiceSummaryPanelProps> = ({ navigate, userData }) => {

    const renderOrders = () => {
        return userData?.pipelineSupportStage?.pipelineSupportMainTaskActivityDTOS.map(order => {
            const description = [ `${ order.amount }szt`, createDescriptionDate(order.startDate!, getLabelFromMonths(order.period!))];

            return (
                <div className={ styles["panel__list-item"] }>
                    <p className={ styles["panel__section-text"] }>
                        { order.pipelineMainTaskDTO.name }
                    </p>
                    <StartServiceDescription description={ description } />
                </div>
            )
        })
    }

    const renderProducts = () => {
        return userData.products.map(product => {
            let area = product.country || product.city || product.state;
            if (area === "POLAND") {
                area = "Polska";
            }
           return (
               <div className={styles["panel__product"]}>
                   <p className={styles["panel__section-text"]}>
                       { product.name }
                   </p>
                   <StartServiceDescription description={[product.subIndustry.name,
                                                           product.sectors.map(s => s.name),
                                                           product.buyerPersons.map(s => s.name),
                                                           area!]}
                                            wrap={true}/>
               </div>
           )
        })
    }
    return (
        <div className={ styles["panel"] }>
            <section className={ styles["panel__section"] }>
                <h2 className={ styles["panel__section--title"] }>Usługi</h2>
                <div className={ styles["panel__level"] }>
                    <div className={ styles["panel__section-head"] }>
                        <h3 className={ styles["panel__section-name"] }>Poziom usługi</h3>
                        <ActionBtn onClick={ () => navigate(0) }
                                   kind={ "Edit" }
                                   backgroundColor={ "white" }
                                   withBorder={ true }/>
                    </div>
                    <p className={ styles["panel__section-text"] }>
                        { userData.pipelineSupportStage.pipelineDTO.name }
                    </p>
                </div>
                <div className={ styles["panel__order"] }>
                    <div className={ styles["panel__section-head"] }>
                        <h3 className={ styles["panel__section-name"] }>Usługi</h3>
                        <ActionBtn onClick={ () => navigate(1) }
                                   kind={ "Edit" }
                                   backgroundColor={ "white" }
                                   withBorder={ true }/>
                    </div>
                    <div className={styles["panel__list"]}>
                        { renderOrders() }
                    </div>
                </div>
            </section>
            <section className={styles["panel__section"]}>
                <div className={styles["panel__section-head"]}>
                    <h2 className={styles["panel__section--title"]}>Produkty</h2>
                    <ActionBtn onClick={ () => navigate(2) }
                               kind={"Edit"}
                               backgroundColor={"white"}
                               withBorder={true}/>
                </div>
                <div className={styles['panel__list']}>
                    { renderProducts() }
                </div>
            </section>

        </div>
    );
};

export default ServiceSummaryPanel;
