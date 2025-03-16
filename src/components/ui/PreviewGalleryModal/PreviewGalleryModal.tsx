import { createPortal } from "react-dom";
import styles from "./PreviewGalleryModal.module.scss";
import { CSSTransition } from "react-transition-group";
import React, { useEffect, useRef, useState } from "react";
import { IPreviewGalleryModalProps } from "@ui/PreviewGalleryModal/previewGalleryModalTypes.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";

const PreviewGalleryModal: React.FC<IPreviewGalleryModalProps> = ({ onClose, galleryItems, isModalOpened }) => {

	const ref = useRef<HTMLDivElement | null>(null);

	const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);

	const mainItem = galleryItems[currentItemIndex];

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	const renderItemSlider = () => {
		return galleryItems.map((item, index) => {
			return <div key={index + 1} className={`${styles['gallery__item']} 
				${index === currentItemIndex && styles['gallery__item--active']}`}>
				<img src={ item.picture } alt="preview item"/>
			</div>
		});
	};

	return createPortal(
		<CSSTransition
			in={ isModalOpened }
			timeout={ 300 }
			unmountOnExit
			classNames={ {
				enter: styles['gallery-enter'],
				enterActive: styles['gallery-enter-active'],
				exit: styles['gallery-exit'],
				exitActive: styles['gallery-exit-active'],
			} }
			nodeRef={ ref }>
			<div ref={ ref }
			     className={ styles['gallery'] }>
				<div className={ styles['gallery__content'] }>
					<div className={ styles['gallery__close'] }>
						<ActionBtn kind={ 'Close' }
						           withBorder={ true }
						           onClick={ onClose }
						           backgroundColor={ 'white' }/>
					</div>
					<div className={ styles['gallery__navigation'] }>
						<ActionBtn kind={ 'Navigate Left' }
						           withBorder={ true }
						           onClick={ () => setCurrentItemIndex(prevState => prevState + 1) }
						           disabled={ currentItemIndex === 0 }
						           backgroundColor={ 'white' }/>
						<ActionBtn kind={ 'Navigate Right' }
						           withBorder={ true }
						           onClick={ () => setCurrentItemIndex(prevState => prevState - 1) }
						           disabled={ currentItemIndex === galleryItems.length - 1 }
						           backgroundColor={ 'white' }/>
					</div>
					<h1 className={ styles['gallery__title'] }>{ mainItem.title ?? 'Brak tytułu' }</h1>
					<p className={ styles['gallery__text'] }>{ mainItem.description ?? 'Brak komentarza'}</p>
					<div className={ styles['gallery__img'] }>
						<img src={ mainItem.picture } alt="preview main item"/>
					</div>
					<div className={styles['gallery__slider']}>
						{renderItemSlider()}
					</div>
				</div>
			</div>
		</CSSTransition>,
		document.body
	)
};

export default PreviewGalleryModal;