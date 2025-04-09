import React, {FC} from 'react';
import styles from "./StartServiceItem.module.scss";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import {IListItemProps} from "@components/features/StartService/ui/startServiceItem/StartServiceItemTypes.ts";

const StartServiceItem: FC<IListItemProps> = ({ onEdit, onDelete, description, title }) => {

    const renderDescription = () => {
        return (
            <p className={styles["item__description"]}>
                { description.join(`\u00A0\u00A0·\u00A0\u00A0`) }
            </p>
        );
    }
    return (
        <div className={ styles["item"] }>
            <div>
                <p className={ styles["item__name"] }>{ title }</p>
                    { renderDescription() }
            </div>
            <div className={ styles["item__icons"] }>
                <ActionBtn onClick={ onEdit }
                           withBorder={ true }
                           backgroundColor={ "white" }
                           kind={ "Edit" }/>
                <ActionBtn onClick={ onDelete }
                           withBorder={ true }
                           backgroundColor={ "white" }
                           kind={ "Delete" }/>
            </div>
        </div>
    );
};

export default StartServiceItem;
