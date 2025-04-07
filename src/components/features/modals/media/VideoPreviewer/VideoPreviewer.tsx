import React, { useCallback, useEffect } from "react";
import { IVideoPreviewerProps } from "@components/features/modals/media/VideoPreviewer/videoPreviewerTypes.ts";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import VideoItem from "@ui/freelancer-profile/VideoItem/VideoItem.tsx";
import styles from './VideoPreviewer.module.scss';

const VideoPreviewer: React.FC<IVideoPreviewerProps> = ({ onClose, registerOnSave, videoUrl }) => {

	const { closeModals } = useModal();

	const handleSave = useCallback(() => {
		onClose();
		closeModals(2);
	}, [ closeModals, onClose ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	return (
		<div className={ styles['previewer'] }>
			<VideoItem videoUrl={ videoUrl }/>
		</div>
	);
}

export default VideoPreviewer;