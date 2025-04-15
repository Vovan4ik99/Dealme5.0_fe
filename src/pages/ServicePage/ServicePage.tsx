import React from 'react';
import Footer from "@components/layout/Footer/Footer.tsx";
import ServiceManager from "@components/features/investor-start-service/ServiceManager/ServiceManager.tsx";
import styles from "./ServicePage.module.scss";
import InvestorOnboardingNavbar from "@components/layout/navbar/InvestorOnboardingNavbar/InvestorOnboardingNavbar.tsx";

const ServicePage= () => {


    return (
        <section className={ styles["service"] }>
            <InvestorOnboardingNavbar />
            <ServiceManager />
            <Footer isHyphenated={ false } isCentered={ false } />
        </section>
    );
}

export default ServicePage;