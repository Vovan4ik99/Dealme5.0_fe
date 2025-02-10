import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import React, {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import {ResetPasswordFormProps} from "@components/features/Auth/ResetPasswordForm/resetPasswordFormTypes.ts";
import {useAuthService} from "@services/authService.ts";
import InputError from "@ui/InputError/InputError.tsx";
import {Link} from "react-router-dom";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import styles from "./ResetPassword.module.scss"

const ResetPasswordForm = () => {
    const [formData, setFormData]= useState({
        email: '',
    });

    const [status, setStatus]= useState<boolean>(false);
    const [error, setError]= useState<string | null>('');
    const { resetPassword, errorMessage, loadingStatus} = useAuthService();

    const {register, handleSubmit, formState: {errors}} = useForm<ResetPasswordFormProps>({
        shouldFocusError: false,
        mode: 'onChange',
        values: formData,
    });
    const onSubmit = useCallback((request: ResetPasswordFormProps) => {


        resetPassword(request.email)
            .then(() => {
                setError('');
                setStatus(true)
            })
            .catch(error => {
                setStatus(false);
                setError(errorMessage);
                console.log(error);
                setFormData(request);
            });

        setFormData(request);
    },[])

    return (
        <form className={styles['reset-password-form']} onSubmit={handleSubmit(onSubmit)} noValidate={true}>
            {status && <AlertItem kind={'success'} text={'Link do resetowania hasła został wysłany na Twój e-mail'} hasMarginTop={true}/>}
            <CustomInput
                preset={'email'}
                errorMessage={errors.email?.message}
                register={register}
            />
            <button className={'btn'} disabled={loadingStatus === 'loading'} type={'submit'}>
                {loadingStatus === 'loading' ? 'Ładowanie' : 'Zresetuj hasło'}
            </button>
            <div className={styles['reset-password-form__wrapper']}>
                <Link className={styles['reset-password-form__link']} to={'/'}>Wróć do logowania</Link>
            </div>
            {error && <InputError text={error}/>}
        </form>
            )
}

export default ResetPasswordForm;