import { useVideoService } from "@services/videoService.ts";
import { Controller, useForm } from "react-hook-form";
import styles from "./AddVideoModalItem.module.scss";
import VideoModalItem
	from "@components/features/EditModal/video/VideoModalItem/VideoModalItem.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import MediaUploader
	from "@components/features/EditModal/media/MediaUploader/MediaUploader.tsx";
import {
	IAddVideoModalItemForm
} from "@components/features/EditModal/video/AddVideoModalItem/addVideoModalItemTypes.ts";
import CustomInput from "@ui/CustomInput/CustomInput.tsx";

const AddVideoModalItem = () => {

	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useForm<IAddVideoModalItemForm>({
			shouldFocusError: false,
			mode: 'onSubmit',
			defaultValues: {
				video: null,
				title: null
			},
	});

	const { openModal } = useModal();
	const { addFreelancerVideo } = useVideoService();

	const handleVideoUpload = (onChange: (value: any) => void) => {
		openModal({
			id: 'unknown',
			title: 'Dodaj wideo',
			shouldCloseOnSaving: false,
			btnText: 'Dodaj video',
			btnWithIcon: true,
			child: (
				<MediaUploader
					mediaType={'video'}
					onVideoAdd={(filename: string, videoUrl: string) => {
						onChange({ filename, file: videoUrl });
					}}
					text={'Akceptowalne formaty: MP4, MOV, AVI, rozmiar: do 10MB'}
				/>
			),
		});
	};

	return (
		<div className={styles['modal']}>
			<Controller
				name="video"
				control={control}
				rules={{
					required: "Dodaj video",
				}}
				render={({ field: { value, onChange } }) => (
					<div id={'video'}>
						<VideoModalItem
							label={'Wideo'}
							emptyStateText={'Nagraj krótkie video'}
							onClick={() => handleVideoUpload(onChange)}
							videoUrl={value?.file ?? null}
							fileName={value?.filename ?? ''}
							onDelete={() => onChange(null)}
						/>
					</div>
				)}
			/>
			<CustomInput preset={'videoTitle'}
			             register={register}
			             errorMessage={errors.title?.message}/>
		</div>

	);
};

export default AddVideoModalItem;