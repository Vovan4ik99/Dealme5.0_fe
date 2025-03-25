import React, {useState} from 'react';
import styles from "./StartServiceSwitcher.module.scss"
import { ReactComponent as BackIcon } from "@icons/named_exported/onboarding/arrow_left.svg";
import { START_SERVICE_STEPS } from "@components/features/StartService/startServiceSwitcherTypes.ts";


const StartServiceSwitcher = () => {
    const [step, setStep] = useState<number>(0);

    const stepData = START_SERVICE_STEPS[step];

    const renderComponent = () => {
        const Component = stepData.component;
        if (!Component) return;

        return <Component onSubmit={ () => setStep(step + 1) }/>;
    }

    return (
        <div className={ styles["service"] }>
            <div className={styles["service__content"]}>
                <header className={ styles["service__header"] }>
                    <button className={ styles["service__icon"] }>
                        <BackIcon  />
                    </button>
                    <span className={ styles["service__subtitle"]}>{ stepData.subtitle }</span>
                </header>
                <h1 className={ styles["service__title"]}>{ stepData.title }</h1>
                { renderComponent() }
            </div>
        </div>
    );
}

export default StartServiceSwitcher;