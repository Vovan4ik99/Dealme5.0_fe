import React, {useCallback, useEffect, useState} from 'react';
import styles from "./ServiceManager.module.scss"
import {ReactComponent as BackIcon} from "@icons/named_exported/onboarding/arrow_left.svg";
import {useNavigate} from "react-router-dom";
import {useAuthService} from "@services/auth/authService.ts";
import {IInvestorData} from "@shared/investor/common.ts";
import { INVESTOR_START_SERVICE_STEPS } from "@components/features/investor-start-service/ServiceStepsData.ts";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";
import {getStartServiceStep} from "@utils/investorServiceUtils.ts";
import {useLoadingStatus} from "@hooks/loadingStatus.hook.ts";
import {useInvestorStartService} from "@services/start/useInvestorStartService.ts";


const ServiceManager = () => {
    const navigate = useNavigate();

    const { fetchInvestorData }= useAuthService();
    const isLoading = useLoadingStatus( useAuthService(),
                                                 useInvestorStartService());
    const [ currentStep, setCurrentStep ] = useState<number>(0);
    const [ userData, setUserData ] = useState<IInvestorData | undefined>(undefined);

    const pipelineSupportMainTaskAlias = userData?.pipelineSupportStage?.pipelineSupportMainTaskActivityDTOS;

    const getInvestorData = useCallback(() => {
        fetchInvestorData()
            .then(setUserData)
            .catch(console.error);
    }, [ fetchInvestorData ]);

    useEffect( getInvestorData, [ getInvestorData ]);

    useEffect(() =>{
        if (!userData) return;

        const step = getStartServiceStep(userData);
        setCurrentStep(step);
    },[ userData ])

    const decrement = () => {
        if (currentStep === 0) {
            navigate('/investor/start');
            return;
        }
        setCurrentStep((step) => --step);
    }

    const increment = () => {
        getInvestorData();

        setCurrentStep((step) => ++step);
    }

    const renderComponent = () => {
        if (!userData) return <LoadingSpinner/>;

        const Component = INVESTOR_START_SERVICE_STEPS[currentStep].component;

        if (!Component) return <LoadingSpinner/>;

        if (currentStep < 3) {
            return <Component userData={ userData } onSubmit={ increment } />;
        }

        return <Component userData={ userData } onSubmit={ increment } navigate={ (index) => setCurrentStep(index) } />
    }

    if (isLoading)  {
        return <LoadingSpinner />
    }

    return (
        <div className={ styles["service"] }>
            <div>
                <header className={ styles["service__head"] }>
                        <button className={ `btn 
                                             btn--squared-circle 
                                             ${styles["service__icon"]}` }
                                onClick={ decrement } >
                            <BackIcon />
                        </button>
                    { currentStep < 2 &&
                             <span className={styles["service__subtitle"]}>
                                { INVESTOR_START_SERVICE_STEPS[currentStep].subtitle }
                             </span> }
                    { currentStep === 2 &&
                        <>
                           <span className={styles["service__subtitle"]}>
                               {userData?.pipelineSupportStage?.pipelineSupportMainTaskActivityDTOS[0]?.pipelineMainTaskDTO?.name}
                           </span>
                        { pipelineSupportMainTaskAlias?.length !== 1 &&
                            <span className={styles["service__subtitle"]}>
                                   {pipelineSupportMainTaskAlias &&
                                       userData?.pipelineSupportStage?.pipelineSupportMainTaskActivityDTOS.length - 1}
                                </span> }
                        </> }
                </header>
                { currentStep !==3
                    ? <h1 className={styles["service__title"]}>{ INVESTOR_START_SERVICE_STEPS[currentStep].title }</h1>
                    : currentStep === 3 &&
                    <>
                        <h1 className={` ${styles["service__title"]} 
                                         ${ styles["service__title--cg"] }`}>
                            { INVESTOR_START_SERVICE_STEPS[currentStep].subtitle }
                        </h1>
                        <h1 className={styles["service__title"]}>{ INVESTOR_START_SERVICE_STEPS[currentStep].title }</h1>
                    </> }
                { renderComponent() }
            </div>
        </div>
    );
}

export default ServiceManager;