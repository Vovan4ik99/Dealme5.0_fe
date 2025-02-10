import Navbar from "@components/layout/OnboardingNavbar/Navbar.tsx";
import styles from "./ResetPasswordPage.module.scss";
import Footer from "@components/layout/Footer/Footer.tsx";
import React from "react";
import ResetPasswordForm from "@components/features/Auth/ResetPasswordForm/ResetPasswordForm.tsx";

interface LoginPageProps {
    name: string;
}

const ResetPasswordPage = ({name}: LoginPageProps) => {
    return (
        <section className={styles['reset-password-page']}>
            <Navbar/>
            <div className={styles['reset-password-page__content']}>
            <div className={styles['reset-password-page__title-box']}>
                <h1 className={'title'}>
                    Zapomniałeś hasła?
                </h1>
                <p className={styles['reset-password-page__text']}>Podaj e-mail a wyślemy Ci link do resetowania hasła</p>
            </div>
            <ResetPasswordForm />
            </div>
            <Footer isHyphenated={true} isCentered={true}/>
        </section>
    )
}

export default ResetPasswordPage;