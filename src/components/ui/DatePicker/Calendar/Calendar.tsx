import React, {FC, useRef, useState} from 'react';
import style from "./Calendar.module.scss";
import {daysOfWeek, months} from "@ui/DatePicker/Calendar/CalendarData.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { CSSTransition } from "react-transition-group";
import {ICalendarProps} from "@ui/DatePicker/Calendar/CalendarTypes.ts";

const Calendar : FC<ICalendarProps>= ({ isOpened }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

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

    const generateCalendar = () => {
        const emptyDays = Array.from({ length: startDay }, (_, i) => (
            <div key={`empty-${i}`} className={ style["calendar__days--empty"] } />
        ));

        const days = Array.from({ length: daysInMonth }, (_, i) => (
            <div key={i + 1} className={ style["calendar__tile"] }>
                {i + 1}
            </div>
        ));

        return [ ...emptyDays, ...days ];
    };

    const renderDaysOfWeek = () => {
        return daysOfWeek.map((day) => (
            <div key={day} className={style["calendar__weeks"]}>{day}</div>
        ))
    }

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
            <div className={style["calendar"]} ref={ modalRef }>
                <div className={style["calendar__head"]}>
                    <ActionBtn onClick={ prevMonth }
                               withBorder={ true }
                               backgroundColor={ "white" }
                               kind={ "Navigate Left" }/>
                    <span>{year} – { months[monthIndex] }</span>
                    <ActionBtn onClick={ nextMonth }
                               withBorder={ true }
                               backgroundColor={ "white" }
                               kind={ "Navigate Right" }/>
                </div>
                <div className={style["calendar__days"]}>
                    { renderDaysOfWeek() }
                    { generateCalendar() }
                </div>
            </div>
        </CSSTransition>
    );
};

export default Calendar;
