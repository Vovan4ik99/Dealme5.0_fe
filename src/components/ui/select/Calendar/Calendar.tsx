import React, {FC, useEffect, useRef, useState} from 'react';
import style from "./Calendar.module.scss";
import {daysOfWeek, months} from "@ui/select/Calendar/CalendarData.ts";
import { CSSTransition } from "react-transition-group";
import {ICalendarProps} from "@ui/select/Calendar/CalendarTypes.ts";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import { ReactComponent as ArrowDown } from "@icons/named_exported/arrow-down.svg";
import DropdownModal from "@ui/select/DropdownModal/DropdownModal.tsx";
import SelectOption from "@ui/select/SelectOption/SelectOption.tsx";

const Calendar : FC<ICalendarProps>= ({ isOpened, chooseDate, chosenDate }) => {
    const [ currentDate, setCurrentDate ] = useState<Date>(chosenDate ? chosenDate : new Date());
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const [ isHovered ,setIsHovered ] = useState<number | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = (firstDay.getDay() + 6) % 7;

    const prevMonth = () => {
        setCurrentDate(new Date(year, monthIndex - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, monthIndex + 1, 1));
    };

    const handlePick = (day: number) => {
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

        chooseDate(selectedDate);
    }

    const generateCalendar = () => {
        const emptyDays = Array.from({ length: startDay }, (_, i) => (
            <div key={`empty-${i}`} className={ style["calendar__days--empty"] } />
        ));

        const days = Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const thisDate = new Date(year,monthIndex,day);


            const normalizedChosenDate= chosenDate?.setHours(0, 0, 0, 0);

            const normalizedThisDate = thisDate.setHours(0, 0, 0, 0);

            const isSelected =
                chosenDate &&
                normalizedChosenDate === normalizedThisDate;

            return <div key={ day }
                        className={ `${ style["calendar__tile"] }
                                     ${ isSelected && style["calendar__tile--active"] }` }
                        onClick={ () =>  handlePick(day) }
                        onMouseEnter={() => setIsHovered(day)}
                        onMouseLeave={() => setIsHovered(null)}>
                        { day }

                            { (isHovered === day && !isSelected) &&
                                <div className={ style["calendar__selection"] }>
                                    <div className={ `${ style["calendar__dot"] } 
                                                      ${ style["calendar__dot--bc"] }` }/>
                                </div>
                            }

                   </div>
        }
        );

        return [ ...emptyDays, ...days ];
    };

    const renderDaysOfWeek = () => {
        return daysOfWeek.map((day) => (
            <div key={ day }
                 className={  style["calendar__weeks"] }>
                { day }
            </div>
        ))
    }

    const renderYears = () => {
        const yearArray = Array.from({ length: 14 }, (_, index) => 2025 + index);
        return yearArray.map((item) => (
                <SelectOption
                    key={item}
                    value={ item.toString() }
                    info={ null }
                    isSelected={ item === currentDate.getFullYear() }
                    onClick={() => handleYearSelect(item)}
                />
            ));
    }

    const renderMonths = () => {
        return months.map((item) => (
            <SelectOption key={item}
                          isSelected={ item === months[currentDate.getMonth()] }
                          onClick={() => handleMonthSelect(item) }
                          info={null}
                          value={item} />
        ))
    }

    const handleMonthSelect = (item: string) => {
        const month = months.indexOf(item);
        setCurrentDate(new Date(year, month , 1));
    }

    const handleYearSelect = (item: number) => {
        setCurrentDate(new Date(item, monthIndex, 1))
    }

    useEffect(() => {
        if (isOpened) {
            modalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [ isOpened ]);

    return (
        <CSSTransition in={ isOpened }
                       timeout={ 300 }
                       unmountOnExit
                       classNames={ {
                           enter: style["calendar--enter"],
                           enterActive: style["calendar--enter-active"],
                           exit: style["calendar--exit"],
                           exitActive: style["calendar--exit-active"],
                       } }
                       nodeRef={ modalRef }>
            <div className={ style["calendar"]} ref={ modalRef }>
                <div className={ style["calendar__head"] }>
                    <div className={ `${style["calendar__title"]} ${ isModalOpen && style["calendar__title--active"] }` }
                            onClick={ () => setIsModalOpen(prev => !prev) }>
                        <span>{ months[monthIndex] } { year } </span>
                        <ArrowDown className={ style["calendar__arrow"] } />
                    </div>
                    <div className={ style["calendar__btn"]}>
                        <ActionBtn onClick={ prevMonth }
                                   withBorder={ false }
                                   backgroundColor={ "white" }
                                   kind={ "Navigate Left" }/>
                        <div className={ style["calendar__dot"] }/>
                        <ActionBtn onClick={ nextMonth }
                                   withBorder={ false }
                                   backgroundColor={ "white" }
                                   kind={ "Navigate Right" }/>
                    </div>
                    <DropdownModal width={ 425 }
                                   renderItems={ renderYears() }
                                   secondRow={ renderMonths() }
                                   isOpen={ isModalOpen }
                                   onClose={() => setIsModalOpen(false) }
                                   isInside={ true }/>
                </div>
                <div className={ style["calendar__days"] }>
                    { renderDaysOfWeek() }
                    { generateCalendar() }
                </div>
            </div>
        </CSSTransition>
    );
};

export default Calendar;
