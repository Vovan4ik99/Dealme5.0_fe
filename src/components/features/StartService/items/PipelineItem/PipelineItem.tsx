import React, {useState} from 'react';
import styles from './PipelineItem.module.scss';
import { ReactComponent as ArrowDown} from "@icons/named_exported/arrow-down.svg";

const PipelineItem = () => {
    const [ isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <div className={ styles["tile"] }>
            <div className={styles["tile__header"]}>
                <ArrowDown className={ styles["tile__arrow"] } />
            </div>
        </div>
    );
};

export default PipelineItem;
