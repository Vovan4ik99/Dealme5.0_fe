import { createPortal } from "react-dom";
import styles from "./PreviewGalleryModal.module.scss";
import { CSSTransition } from "react-transition-group";
import React, { useEffect, useRef, useState } from "react";
import { IPreviewGalleryModalProps } from "@ui/freelancer-profile/PreviewGalleryModal/previewGalleryModalTypes.ts";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";

const PreviewGalleryModal: React.FC<IPreviewGalleryModalProps> = ({ onClose, galleryItems, isModalOpened, startIndex }) => {

	const ref = useRef<HTMLDivElement | null>(null);
	const imgRef = useRef(null);

	const [ currentItemIndex, setCurrentItemIndex ] = useState<number>(0);
	const [ isImageTransitioning, setIsImageTransitioning ] = useState<boolean>(false);

	useEffect(() => {
		setCurrentItemIndex(startIndex ?? 0);
	}, [startIndex]);

	const mainItem = galleryItems[currentItemIndex];

	useEffect(() => {
		if (!isModalOpened) {
			return;
		}
		
		document.body.style.overflow = 'hidden';
		
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isModalOpened]);

	const renderItemSlider = () => {
		return galleryItems.map((item, index) => {
			return <div key={ index + 1 } className={ `${ styles['gallery__item'] } 
				${ index === currentItemIndex && styles['gallery__item--active'] }` }>
				<img src={ item.picture } alt="preview item"/>
			</div>
		});
	};

	const handleNavigateClick = (isNext: boolean) => {
		setIsImageTransitioning(true);
		setTimeout(() => {
			setCurrentItemIndex(prev => isNext ? prev + 1 : prev - 1);
			setIsImageTransitioning(false);
		}, 200);
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
						           onClick={ () => handleNavigateClick(false) }
						           disabled={ currentItemIndex === 0 }
						           backgroundColor={ 'white' }/>
						<ActionBtn kind={ 'Navigate Right' }
						           withBorder={ true }
						           onClick={ () => handleNavigateClick(true) }
						           disabled={ currentItemIndex === galleryItems.length - 1 }
						           backgroundColor={ 'white' }/>
					</div>
					<h1 className={ styles['gallery__title'] }>{ mainItem.title ?? 'Brak tytułu' }</h1>
					<p className={ styles['gallery__text'] }>{ mainItem.description ?? 'Brak komentarza' }</p>
					<CSSTransition
						in={ !isImageTransitioning }
						timeout={ 200 }
						classNames={{
							enter: styles['img-enter'],
							enterActive: styles['img-enter-active'],
							exit: styles['img-exit'],
							exitActive: styles['img-exit-active'],
						}}
						nodeRef={ imgRef }
						unmountOnExit>
						<div ref={ imgRef } className={ styles['gallery__img'] }>
							<img src={ mainItem.picture } alt="preview main item"/>
						</div>
					</CSSTransition>
					<div className={ styles['gallery__slider'] }>
						{ renderItemSlider() }
					</div>
				</div>
			</div>
		</CSSTransition>,
		document.body
	)
};

export default PreviewGalleryModal;