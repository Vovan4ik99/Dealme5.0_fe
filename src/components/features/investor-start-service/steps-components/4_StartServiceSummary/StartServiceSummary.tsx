import React, {FC} from 'react';
import OnboardingRegistrationForm
    from "@components/features/onboarding/OnboardingRegistrationForm/OnboardingRegistrationForm.tsx";
import styles from "./StartServiceSummary.module.scss";
import ServiceSummaryPanel
    from "@components/features/investor-start-service/steps-components/4_StartServiceSummary/ServiceSummaryPanel/ServiceSummaryPanel.tsx";
import {
    IStartServiceComponentProps
} from "@components/features/investor-start-service/ServiceManager/ServiceManagerTypes.ts";
import {useAuthService} from "@services/auth/authService.ts";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";

const StartServiceSummary: FC<IStartServiceComponentProps> = ({ userData, navigate }) => {
    const { loadingStatus } = useAuthService();

    if(loadingStatus === "loading"){
        return <LoadingSpinner />
    }
    return (
        <div className={ styles["summary"] }>
            <ServiceSummaryPanel navigate={ navigate! } userData={ userData } />
            <OnboardingRegistrationForm />
        </div>
    );
};

export default StartServiceSummary;
