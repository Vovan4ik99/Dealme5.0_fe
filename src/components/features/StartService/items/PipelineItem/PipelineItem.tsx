import React, { useCallback, useState } from 'react';
import styles from './PipelineItem.module.scss';
import { ReactComponent as ArrowDown } from "@icons/named_exported/arrow-down.svg";
import TooltipIcon from "@ui/TooltipIconBtn/TooltipIcon.tsx";
import { IPipelineStepProps } from "@components/features/StartService/items/PipelineItem/PipelineItemTypes.ts";

const PipelineItem: React.FC<IPipelineStepProps> = ({ pipelineId,
                                                        title,
                                                        icon,
                                                        destiny,
                                                        subtitle,
                                                        onSubmit }) => {

    const [ isOpened, setIsOpened ] = useState<boolean>(false);
    const [ isHovered, setIsHovered ] = useState<number | null>(null);

    const mainTask = [
        { task: 'Analiza rynku', value: 'Przeprowadzanie badań rynku, analizowanie danych i dostarczanie wniosków zespołom sprzedażowym.'},
        { task: 'Opracowanie strategii Go-to-Market (GTM)', value: 'Opracowanie szczegółowego planu wprowadzania produktu na rynek, definiowanie kanałów sprzedaży i marketingu.'},
        { task: 'Segmentacja i identyfikacja idealnych klientów (ICP)', value: 'Obsługa zapytań przychodzących, segmentacja i przekazywanie leadów do odpowiednich zespołów.'},
        { task: 'Definiowanie procesu sprzedażowego', value: 'Analiza i wyznaczanie kluczowych segmentów rynku oraz potencjalnych możliwości wzrostu.'},
    ];

    const fetchMainTask = useCallback(() => {
        //TODO
    }, [ ])

    const renderTasks = () => {
        return mainTask.map((item, i) => {
            return <div key={ i }
                        className={ styles["tile__description--tips"] }
                        onMouseEnter={ () => setIsHovered(i) }
                        onMouseLeave={ () => setIsHovered(null)} >
                <p>{item.task}</p>
                <TooltipIcon text={ item.value }
                             isIconTop={ false }
                             isLeft={ true }
                             isActive={ isHovered === i }/>
            </div>
        })
    }

    return (
        <div className={ `${ styles["tile"]} ${ isOpened && styles["tile--active"] }` }>
            <div className={styles["tile__header"]}>
                <div className={styles["tile__header--info"]} onClick={ () => setIsOpened((prev) => !prev) }>
                    <ArrowDown className={ isOpened ? styles["tile__arrow--active"] : styles["tile__arrow"] } />
                    <div className={ styles["tile__header--icon"] }>
                        { icon }
                    </div>
                    <div className={ styles["tile__text"] }>
                        <h2 className={ styles["tile__text--title"]}>{ title }</h2>
                        <p className={ styles["tile__text--subtitle"] }>{ subtitle }</p>
                    </div>
                </div>
                <button className={ styles["tile__btn"] }
                        onClick={ onSubmit } >
                    Wybierz i przejdź dalej
                    <ArrowDown className={ styles["tile__arrow"] } />
                </button>
            </div>
            { isOpened && (
                <>
                    <div className={ styles["tile__line"] }/>
                    <div className={ styles["tile__opened"] }>
                        <div className={ styles["tile__description"] }>
                            <p className={ styles["tile__description--title"] }>CEL</p>
                            <p className={ styles["tile__description--info"] }>{ destiny }</p>
                        </div>
                        <div className={ `${ styles["tile__description"] } ${ styles["tile__description--w400"] }` }>
                            <p className={ styles["tile__description--title"] }>GŁÓWNE ZADANIA</p>
                            { renderTasks() }
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PipelineItem;
