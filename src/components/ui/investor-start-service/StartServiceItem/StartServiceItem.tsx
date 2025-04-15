import React, { FC } from 'react';
import styles from "./StartServiceItem.module.scss";
import {IListItemProps} from "@ui/investor-start-service/StartServiceItem/StartServiceItemTypes.ts";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import StartServiceDescription from "@ui/investor-start-service/StartServiceDescription/StartServiceDescription.tsx";

const StartServiceItem: FC<IListItemProps> = ({ onEdit, onDelete, description, title, isEditDisabled }) => {


    return (
        <div className={ styles["item"] }>
            <div>
                <p className={ styles["item__name"] }>{ title }</p>
                    <StartServiceDescription description={ description } />
            </div>
            <div className={ styles["item__icons"] }>
                <ActionBtn onClick={ onEdit }
                           withBorder={ true }
                           disabled={ isEditDisabled }
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
