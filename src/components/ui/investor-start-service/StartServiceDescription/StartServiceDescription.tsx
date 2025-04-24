import React, {FC, ReactNode} from 'react';
import styles from "./StartServiceDescription.module.scss"
import {
    IStartServiceDescriptionProps
} from "@ui/investor-start-service/StartServiceDescription/StartServiceDescriptionTypes.ts";

const StartServiceDescription: FC<IStartServiceDescriptionProps> = ({ description, wrap }) => {

    const renderDescription = () => {
        return description.map((item, index) => {
                    const isArrayWithOneElements = Array.isArray(item) && item.length === 1;

                    if (typeof item === "string" || isArrayWithOneElements) {
                        return <span key={index}>{item}</span>;
                    }
                    return (
                        <span className={ styles["description__stack"] } key={ index }>
                            { item[0] }
                            <span className={ styles["description__box"] }> { item.length } </span>
                        </span>
                    )
                }).reduce((acc: ReactNode[], curr, i) => {
                    if (i === 0) {
                        return [curr];
                    }
                    return [
                        ...acc,
                        <span key={`dot-${i}`}>&nbsp;&nbsp;·&nbsp;&nbsp;</span>,
                        curr,
                    ];
                }, []) ;
    }

    return (
        <p className={` ${styles["description"]} ${wrap && styles["description--wrap"] } `}>
            { renderDescription() }
        </p>
    )
};

export default StartServiceDescription;
