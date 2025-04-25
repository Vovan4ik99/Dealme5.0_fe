import React, {FC, useEffect} from 'react';
import styles from './NotFoundPage.module.scss';
import Logo from '@components/ui/common/Logo/Logo';
import { ReactComponent as NotFound } from '@icons/named_exported/404/not_found.svg';
import { useNavigate } from "react-router-dom";
import {INotFoundPageProps} from "@pages/NotFoundPage/NotFoundPageProps.ts";

const NotFoundPage: FC<INotFoundPageProps> = ({ setIsLogoCentered }) => {
    const navigate = useNavigate();

    useEffect(() => {
        setIsLogoCentered(true);

        return () => {
            setIsLogoCentered(false);
        };
    }, [ ]);

    return (
        <div className={ styles['page'] }>
            <div className={ styles['page__logo'] }>
                <Logo/>
            </div>
            <NotFound width={ 541.94 } height={ 336.65 }/>
            <h1 className={ styles["page__title"] }>Strona nie została<br /> znaleziona</h1>
            <p className={ styles["page__info"] }>
                Możliwe, że podana strona nigdy nie istniała lub została <br /> usunięta. Sprawdź URL, może zawiera zbędne znaki.
            </p>
            <button className={ `btn ${ styles["page__btn"] }` }
                    onClick={ () => navigate('/login') }>
                Wróć na stronę główną
            </button>
        </div>
    );
};

export default NotFoundPage;
