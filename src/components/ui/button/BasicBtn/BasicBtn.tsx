import React, { FC } from 'react';
import { IBasicBtnProps } from "@ui/button/BasicBtn/BasicBtnTypes.ts";
import styles from "./BasicBtn.module.scss";

const BasicBtn: FC<IBasicBtnProps> = ({ text,
                                        handleClick,
                                        colors }) => {
    return (
        <button className={ `${ styles["btn"] } 
                             btn--${ colors }` }
                onClick={ handleClick }>
            { text }
        </button>
    );
};

export default BasicBtn;
