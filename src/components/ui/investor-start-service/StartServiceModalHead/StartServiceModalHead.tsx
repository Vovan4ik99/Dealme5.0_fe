import React, { FC } from 'react';
import styles from "./StartServiceModalHead.module.scss";
import {
    IModalHeadProps
} from "@ui/investor-start-service/StartServiceModalHead/StartServiceModalHeadTypes.ts";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";

const StartServiceModalHead: FC<IModalHeadProps> = ({ title }) => {

    return (
        <div>
            <div className={ styles["head__title"] }>
                <AddIcon className={ styles["head__icon"] } />
                <p className={ styles["head__action-name"] }>{ title }</p>
            </div>
        </div>
    );
};

export default StartServiceModalHead;
