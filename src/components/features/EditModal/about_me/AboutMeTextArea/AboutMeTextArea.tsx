import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from './AboutMeTextArea.module.scss';
import {IAboutMeTextAreaProps} from "@components/features/EditModal/about_me/AboutMeTextArea/aboutMeTextAreaTypes.ts";
import resizing_img from "@icons/freelancer_profile/about_me/area_resizing.svg";

const AboutMeTextArea: React.FC<IAboutMeTextAreaProps> = ({
	                                                          maxSymbols,
	                                                          label,
	                                                          fontSize = 18,
	                                                          fontWeight = 500,
	                                                          placeholder,
	                                                          minHeight = 100,
	                                                          onTextChange,
	                                                          value
                                                          }) => {

	const [text, setText] = useState('');
	const [height, setHeight] = useState(minHeight);

	const isResizing = useRef(false);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (value !== '') {
			setText(value);
		}
	}, [value]);

	const calculateMaxHeight = useCallback(() => {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");
		if (!context) {
			throw new Error("Canvas 2D context is not supported or failed to initialize.");
		}

		context.font = `${fontSize}px Outfit`;
		const maxWidth = 504;
		const lineHeight = 1.2 * fontSize;
		const text = "a".repeat(maxSymbols);

		const words = text.split("");
		let lineWidth = 0;
		let lineCount = 1;

		for (const word of words) {
			const wordWidth = context.measureText(word).width;
			if (lineWidth + wordWidth > maxWidth) {
				lineCount++;
				lineWidth = wordWidth;
			} else {
				lineWidth += wordWidth + context.measureText(" ").width;
			}
		}

		return lineCount * lineHeight;
	}, [fontSize, maxSymbols]);

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value;

		if (value.length <= maxSymbols) {
			setText(value);
			onTextChange(value);
		}

		if (textareaRef.current) {
			updateHeights(textareaRef.current);
		}
	};

	const updateHeights = useCallback((textarea: HTMLTextAreaElement) => {
		textarea.style.height = "auto";
		const padding = 32;
		const gap = 4;
		const labelHeight = 17;
		const scrollHeight = textarea.scrollHeight + padding + gap + labelHeight;
		const maxHeight = calculateMaxHeight();
		const newHeight = Math.min(Math.max(scrollHeight, height), maxHeight);
		textarea.style.height = `${newHeight}px`;
		setHeight(newHeight);
	}, [calculateMaxHeight, height]);

	useEffect(() => {
		if (textareaRef.current) {
			updateHeights(textareaRef.current);
		}
	}, [text, updateHeights]);

	const handleMouseDown = (e: React.MouseEvent) => {
		isResizing.current = true;
		const startY = e.clientY;
		const startHeight = height;

		const handleMouseMove = (mouseEvent: MouseEvent) => {
			if (isResizing.current) {
				const delta = mouseEvent.clientY - startY;
				const newHeight = Math.min(
					Math.max(startHeight + delta, minHeight), calculateMaxHeight()
				);
				setHeight(newHeight);
			}
		};

		const handleMouseUp = () => {
			isResizing.current = false;
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
		e.preventDefault();
	}

	return (
		<div className={styles['textarea']} style={{height: `${height}px`}}>
			<div className={styles['textarea__label']}>
				<span>{label}</span>
				<span>{text.length} / {maxSymbols}</span>
			</div>
			<textarea className={styles['textarea__input']}
			          ref={textareaRef}
			          onChange={handleChange}
			          value={text}
			          maxLength={maxSymbols}
			          placeholder={placeholder}
			          style={{fontSize: `${fontSize}px`, fontWeight: fontWeight}}/>
			<button className={styles['textarea__btn']}
			        onMouseDown={handleMouseDown}>
				<img src={resizing_img} alt="resize"/>
			</button>
		</div>
	);
};

export default AboutMeTextArea;