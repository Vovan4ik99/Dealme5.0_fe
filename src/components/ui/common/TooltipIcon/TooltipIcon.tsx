import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactComponent as InfoIcon } from "@icons/named_exported/info_icon.svg";
import styles from './TooltipIcon.module.scss';
import { ITooltipIconProps } from "@ui/common/TooltipIcon/tooltipIconTypes.ts";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

const TooltipIcon: React.FC<ITooltipIconProps> = ({ text, isLeft = false, isActive = false, isIconTop = false }) => {
	const [ tooltipStyle, setTooltipStyle ] = useState<React.CSSProperties>({});
	const [ arrowStyle, setArrowStyle ] = useState<React.CSSProperties>({});
	const iconRef = useRef<HTMLDivElement | null>(null);
	const tooltipRef = useRef<HTMLDivElement | null>(null);

	const updateTooltipPosition = useCallback(() => {
		if (iconRef.current && tooltipRef.current) {
			const iconRect = iconRef.current.getBoundingClientRect();

			const style: React.CSSProperties = {
				position: 'absolute',
				top: `${ iconRect.top + window.scrollY + 16 }px`,
				left: isLeft
					? `${ iconRect.left + window.scrollX - 16 }px`
					: `${ iconRect.right + window.scrollX - 280 }px`,
				zIndex: 2000,
			};

			const arrowPosition: React.CSSProperties = {
				position: 'absolute',
				top: '-5px',
				right: isLeft ? 'calc(100% - 28px)' : '21px',
				transform: 'rotate(45deg)',
				zIndex: 2001,
			};

			setTooltipStyle(style);
			setArrowStyle(arrowPosition);
		}
	}, [ isLeft ]);

	useEffect(() => {
		if (isActive) {
			updateTooltipPosition();
			window.addEventListener('scroll', updateTooltipPosition);
			window.addEventListener('resize', updateTooltipPosition);
		}

		return () => {
			window.removeEventListener('scroll', updateTooltipPosition);
			window.removeEventListener('resize', updateTooltipPosition);
		};
	}, [ isActive, isLeft, isIconTop, updateTooltipPosition ]);

	const getTooltipStyle = () => {
		if (isIconTop) {
			return { alignItems: 'flex-start', marginTop: '2px' };
		}
		return { alignItems: 'center' };
	}

	return (
		<div ref={ iconRef }
		     style={ getTooltipStyle() }
		     role="tooltip"
		     onMouseEnter={ updateTooltipPosition }
		     className={ `${ styles['item'] } ${ isActive && styles['item--active'] }` }>
			<InfoIcon width={ 14 } height={ 14 }/>
			{ createPortal(
				<CSSTransition
					in={ isActive }
					timeout={ 300 }
					unmountOnExit
					classNames={ {
						enter: styles['tooltip-enter'],
						enterActive: styles['tooltip-enter-active'],
						exit: styles['tooltip-exit'],
						exitActive: styles['tooltip-exit-active'],
					} }
					nodeRef={ tooltipRef }>
					<div
						ref={ tooltipRef }
						style={ tooltipStyle }
						className={ `${ styles['item__wrapper'] }` }
					>
						<div className={ styles['item__arrow'] } style={ arrowStyle }/>
						<div className={ styles['item__modal'] }>{ text }</div>
					</div>
				</CSSTransition>,
				document.body
			) }
		</div>
	)
}

export default TooltipIcon;