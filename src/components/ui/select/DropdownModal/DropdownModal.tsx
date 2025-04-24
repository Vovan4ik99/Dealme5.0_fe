import { CSSTransition } from "react-transition-group";
import React, { useRef } from "react";
import { IDropdownModalProps } from "@ui/select/DropdownModal/DropDownModalTypes.ts";
import styles from "./DropdownModal.module.scss";

const DropDownModal : React.FC<IDropdownModalProps> = ({ isOpen, renderItems, width, secondRow, isInside }) => {

    const modalRef = useRef<HTMLDivElement>(null);

    return (
        <CSSTransition in={ isOpen }
                   timeout={ 300 }
                   unmountOnExit
                   classNames={ {
                       enter: styles["dropdown--enter"],
                       enterActive: styles["dropdown--enter-active"],
                       exit: styles["dropdown--exit"],
                       exitActive: styles["dropdown--exit-active"],
                   } }
                   nodeRef={ modalRef }>
        <div
            ref={ modalRef }
            className={ `${ styles["dropdown"] } 
                         ${ isInside && styles["dropdown--inside"] }` }
            style={ typeof width === "number"
                         ? {  width: `${ width + 30 }px` }
                         : { width: width } } >
            { !secondRow
                ? renderItems
                : (
                    <div className={ styles["dropdown__row"] }>
                        <div className={ styles["dropdown__column"] }>{ renderItems }</div>
                        <div className={ styles["dropdown__column"] }>{ secondRow }</div>
                    </div>
                )}
        </div>
    </CSSTransition>
    )
}

export default DropDownModal;