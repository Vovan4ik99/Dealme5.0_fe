import React, {useState} from 'react';
import styles from "./ServiceSwitcher.module.scss"
import {ReactComponent as BackIcon} from "@icons/named_exported/onboarding/arrow_left.svg";
import {START_SERVICE_STEPS} from "@components/features/StartService/ServiceSwitcherSteps.ts";


const ServiceSwitcher = () => {

    const [step, setStep] = useState<number>(0);

    const stepData = START_SERVICE_STEPS[step];

    const handleDecrement = () => {
        setStep((step) => step - 1);
    }

    const renderComponent = () => {
        const Component = stepData.component;
        if (!Component) return;

        return <Component onSubmit={ () => setStep((step) => step + 1) }/>;
    }

    return (
        <div className={ styles["service"] }>
            <div className={ styles["service__content"] }>
                <header className={ styles["service__header"] }>
                    { step > 0 &&
                        <button className={ styles["service__icon"] } onClick={ handleDecrement } >
                            <BackIcon />
                        </button> }
                    <span className={ styles["service__subtitle"] }>{ stepData.subtitle }</span>
                </header>
                <h1 className={ styles["service__title"] }>{ stepData.title }</h1>
                { renderComponent() }
            </div>
        </div>
    );
}

export default ServiceSwitcher;