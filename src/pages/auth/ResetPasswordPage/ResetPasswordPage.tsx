import styles from "./ResetPasswordPage.module.scss"
import Footer from "@components/layout/Footer/Footer.tsx";
import React from "react";
import ResetPasswordForm from "@components/features/auth/ResetPasswordForm/ResetPasswordForm.tsx";
import FreelancerOnboardingNavbar
    from "@components/layout/navbar/FreelancerOnboardingNavbar/FreelancerOnboardingNavbar.tsx";


const ResetPasswordPage = () => {
    return (
        <section className={ styles['reset-page'] }>
            <FreelancerOnboardingNavbar/>
            <ResetPasswordForm/>
            <Footer isHyphenated={ true } isCentered={ true }/>
        </section>
    )
}

export default ResetPasswordPage;