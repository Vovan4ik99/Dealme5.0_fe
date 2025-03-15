import { CSSTransition } from "react-transition-group";
import React, { useRef } from "react";
import { IDropdownModalProps } from "@ui/DropdownModal/DropDownModalTypes.ts";
import styles from "./DropdownModal.module.scss";

const DropDownModal : React.FC<IDropdownModalProps> = ({ isOpen, renderEntities, isFullWidth }) => {

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
            className={ `${styles["dropdown"]} 
                         ${ isFullWidth ? styles["dropdown__input"] : "" } ` }>
            { renderEntities() }
        </div>
    </CSSTransition>
    )
}

export default DropDownModal;