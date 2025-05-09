import React, {useRef, useState} from 'react';
import styles from './PipelineItem.module.scss';
import { ReactComponent as ArrowDown } from "@icons/named_exported/arrow_down.svg";
import TooltipIcon from "@ui/common/TooltipIcon/TooltipIcon.tsx";
import { IPipelineStepProps } from "@components/features/investor-start-service/steps-components/1_PipelineStep/pipelineItem/PipelineItemTypes.ts";
import { CSSTransition } from "react-transition-group";

const PipelineItem: React.FC<IPipelineStepProps> = ({   title,
                                                        id,
                                                        icon,
                                                        destiny,
                                                        subtitle,
                                                        mainTasks,
                                                        onSubmit }) => {

    const [ isOpened, setIsOpened ] = useState<boolean>(false);
    const [ isHovered, setIsHovered ] = useState<number | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const renderTasks = () => {
        return mainTasks.map((item) => {
            return <div key={ item.id }
                        className={ styles["tile__tooltip"] }
                        onMouseEnter={ () => setIsHovered(item.id) }
                        onMouseLeave={ () => setIsHovered(null)} >
                <p>{item.name}</p>
                <TooltipIcon text={ item.description }
                             isIconTop={ false }
                             isLeft={ true }
                             isActive={ isHovered === item.id }/>
            </div>
        })
    }

    return (
        <div className={ `${ styles["tile"] } ${ isOpened && styles["tile--active"] }` }>
            <div className={ styles["tile__top-bar"] }>
                <div className={ styles["tile__summary"] } onClick={ () => setIsOpened((prev) => !prev) }>
                    <ArrowDown className={ isOpened ? styles["tile__arrow--active"] : styles["tile__arrow"] } />
                    <div className={ styles["tile__icon"] }>
                        { icon }
                    </div>
                    <div className={ styles["tile__info"] }>
                        <h2 className={ styles["tile__title"]}>{ title }</h2>
                        <p className={ styles["tile__subtitle"] }>{ subtitle }</p>
                    </div>
                </div>
                <button className={ `btn 
                                     btn--tertiary 
                                     ${ styles["tile__btn"] }` }
                        onClick={ () => onSubmit(id) } >
                    Wybierz i przejdź dalej
                    <ArrowDown className={ styles["tile__arrow"] } />
                </button>
            </div>
            <CSSTransition in={ isOpened }
                           timeout={ 200 }
                           unmountOnExit
                           classNames={ {
                               enter: styles["tile__dropdown--enter"],
                               enterActive: styles["tile__dropdown--enter-active"],
                               exit: styles["tile__dropdown--exit"],
                               exitActive: styles["tile__dropdown--exit-active"],
                           } }
                           nodeRef={ modalRef }>
                <div ref={ modalRef }>
                    <div className={ styles["tile__separator"] }/>
                    <div className={ styles["tile__content"] }>
                        <div className={ styles["tile__section"] }>
                            <p className={ styles["tile__section-name"] }>CEL</p>
                            <p className={ styles["tile__description"] }>{destiny}</p>
                        </div>
                        <div className={ `${ styles["tile__section"] } ${ styles["tile__section--w400"] }` }>
                            <p className={ styles["tile__section-name"] }>GŁÓWNE ZADANIA</p>
                            { renderTasks() }
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default PipelineItem;
