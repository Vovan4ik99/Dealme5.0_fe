import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import React, {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import {IResetPasswordFormData} from "@components/features/Auth/ResetPasswordForm/resetPasswordFormTypes.ts";
import {useAuthService} from "@services/authService.ts";
import InputError from "@ui/InputError/InputError.tsx";
import {Link} from "react-router-dom";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import styles from "./ResetPasswordForm.module.scss"


const ResetPasswordForm = () => {

    const [email, setEmail] = useState<string>('');
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
    const {resetPassword, errorMessage, loadingStatus} = useAuthService();


    const {register, handleSubmit, formState: {errors}} = useForm<IResetPasswordFormData>({
        shouldFocusError: false,
        mode: 'onChange',
        values: {email},
    });


    const onSubmit = useCallback((request: IResetPasswordFormData) => {
        resetPassword(request.email)
            .then(() => setIsEmailSent(true))
            .catch(error => console.log(error));

        setEmail(request.email);
    }, [resetPassword, setEmail])


    return (
        <>
            <form className={styles['form']} onSubmit={handleSubmit(onSubmit)} noValidate={true}>
                <div className={styles['form__header']}>
                    <h1 className={'title'}>
                        Zapomniałeś hasła?
                    </h1>
                    <p className={styles['form__text']}>Podaj e-mail a wyślemy Ci link do resetowania hasła</p>
                </div>
                <div className={styles['form__content']}>
                    {isEmailSent &&
                        <AlertItem kind={'success'} text={'Link do resetowania hasła został wysłany na Twój e-mail'}
                                   hasMarginTop={true}/>}
                    <CustomInput
                        preset={'email'}
                        errorMessage={errors?.email?.message}
                        register={register}
                    />
                    <button className={'btn'} disabled={loadingStatus === 'loading'} type={'submit'}>
                        {loadingStatus === 'loading' ? 'Ładowanie' : 'Zresetuj hasło'}
                    </button>
                    <div className={styles['form__wrapper']}>
                        <Link className={styles['form__link']} to={'/login'}>Wróć do logowania</Link>
                    </div>
                    {errorMessage && loadingStatus === 'error' && <InputError text={errorMessage!}/>}
                </div>
            </form>
        </>
    )
}

export default ResetPasswordForm;