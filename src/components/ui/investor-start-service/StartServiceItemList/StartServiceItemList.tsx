import React, {FC} from 'react';
import styles from "./StartServiceItemList.module.scss";
import {IActionListProps} from "@ui/investor-start-service/StartServiceItemList/StartServiceItemListTypes.ts";
import {ReactComponent as AddIcon} from "@icons/named_exported/add_icon.svg";
import {ReactComponent as RightArrow} from "@icons/named_exported/arrow_right.svg";

const StartServiceItemList: FC<IActionListProps> = ({ items,
                                                 addingMoreBtn,
                                                 boldEmptyInfo,
                                                 btnText,
                                                 isLastPage,
                                                 emptyInfo,
                                                 onSubmit,
                                                 onEmptyImg,
                                                 onAdd }) => {

    return (
        <div>
            { items.length ?
                <div className={ styles["list__order"] }>
                    <div>{ items }</div>
                    <div className={ `${styles["list__placeholder"]} 
                                      ${ styles["list__placeholder--empty"] }` }
                         onClick={ onAdd }>
                        <AddIcon/>
                        { addingMoreBtn }
                    </div>
                    <button className={ `btn 
                                         ${styles["list__btn"]} 
                                         ${styles["list__btn--primary"]}` }
                            onClick={ onSubmit }>
                        { isLastPage ? "Przejdź do podsumowania" : "Przejdź dalej" }
                        <RightArrow/>
                    </button>
                </div>
                : (
                    <div className={ styles["list__placeholder"] } onClick={ onAdd }>
                        <img src={ onEmptyImg } alt="girls adding files to folder"/>
                        <div>
                            <p className={ styles["list__description"] } >{ emptyInfo }</p>
                            <p className={ `${ styles["list__description"] } ${ styles["list__description--bold"] }` } >{ boldEmptyInfo }</p>
                            <button className={ `btn ${ styles["list__btn"] }` }>
                                <AddIcon />
                                { btnText }
                            </button>
                        </div>
                    </div>
                ) }
        </div>
    );
};

export default StartServiceItemList;
