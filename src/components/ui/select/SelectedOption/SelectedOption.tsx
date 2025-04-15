import React, {FC} from 'react';
import {ISelectedOptionProps} from "@ui/select/SelectedOption/SelectedOptionTypes.ts";
import styles from './SelectedOption.module.scss';
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";

const MyComponent: FC<ISelectedOptionProps> = ({ text, onDelete }) => {

    const renderTiles = () => {
        return text.map((option, index) => (
            <div key={index} className={ styles["list__option"] }>
                <span className={ styles["list__text"] }>{ option }</span>
                <ActionBtn onClick={ () => onDelete(option)}
                           kind={ 'Delete' }
                           withBorder={ true }
                           backgroundColor={ 'white' }/>
            </div>
        ))
    }

    return (
        <div className={ styles["list"] }>
            { renderTiles() }
        </div>
    );
};

export default MyComponent;
