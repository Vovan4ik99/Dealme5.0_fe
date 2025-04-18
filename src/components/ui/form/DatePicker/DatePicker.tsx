import React, {useState} from 'react';
import style from './DatePicker.module.scss'
import Calendar from "@ui/form/DatePicker/Calendar/Calendar.tsx";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";

const DataPicker = () => {
    const [ isOpened, setIsOpened ] = useState<boolean>(false);

    return (
        <div className={ style["data-picker"] }>
            <div className={ style["data-picker__btn"]}>
                <div>
                    <p className={style["data-picker__title"]}>Od</p>
                    <p className={style["data-picker__value"]}>02.01.2025</p>
                </div>
                <ActionBtn onClick={() => setIsOpened(prev => !prev)}
                           withBorder={true}
                           backgroundColor={"white"}
                           kind={"Calendar"}/>
            </div>

                <Calendar isOpened={ isOpened }/>
        </div>
    );
};

export default DataPicker;
