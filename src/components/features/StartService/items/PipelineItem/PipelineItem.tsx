import React, {useState} from 'react';
import styles from './PipelineItem.module.scss';
import { ReactComponent as ArrowDown} from "@icons/named_exported/arrow-down.svg";
import { ReactComponent as ProjectionScreen } from "@icons/named_exported/start-service/projection_screen.svg";

const PipelineItem = () => {
    const [ isOpened, setIsOpened ] = useState<boolean>(false);

    return (
        <div className={ styles["tile"] }>
            <div className={styles["tile__header"]}>
                <div className={styles["tile__header--info"]} onClick={ () => setIsOpened((prev) => !prev) }>
                    <ArrowDown className={ isOpened ? styles["tile__arrow--active"] : styles["tile__arrow"] } />
                    <div className={ styles["tile__icon"] }>
                        <ProjectionScreen />
                    </div>
                    <div className={ styles["tile__text"] }>
                        <h2 className={ styles["tile__text--title"]}>Wsparcie sprzedaży: generowanie leadów i zainteresowania</h2>
                        <p className={ styles["tile__text--subtitle"] }>lorem ipsu</p>
                    </div>
                </div>
                <button className={ styles["tile__btn"] }>
                    Wybierz i przejdź dalej
                    <ArrowDown className={ styles["tile__arrow"] } />
                </button>
            </div>
            { isOpened && <p>lorem</p>}
        </div>
    );
};

export default PipelineItem;
