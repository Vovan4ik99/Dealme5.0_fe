import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import styles from "./NotFoundPage.module.scss";
import Logo from "@ui/common/Logo/Logo.tsx";
import { ReactComponent as NotFoundImage } from '@icons/named_exported/404/not_found.svg';

const NotFoundPage= () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname !== '/404') {
            window.history.pushState({ page: 404 }, '', '/404');
        }
    }, [ ]);

    return (
        <div className={ styles['page'] }>
            <div className={ styles['page__logo'] }>
                <Logo/>
            </div>
            <div className={ styles['page__content'] }>
                <NotFoundImage width={ 541.94 }
                               height={ 336.65 }/>
                <h1 className={ styles["page__title"] }>
                    Strona nie została<br/> znaleziona
                </h1>
                <p className={ styles["page__info"] }>
                    Możliwe, że podana strona nigdy nie istniała lub została <br/> usunięta. Sprawdź URL, może zawiera
                    zbędne znaki.
                </p>
                <button className={ `btn ${ styles["page__btn"] }` }
                        onClick={ () => navigate(-2) }>
                    Wróć
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
