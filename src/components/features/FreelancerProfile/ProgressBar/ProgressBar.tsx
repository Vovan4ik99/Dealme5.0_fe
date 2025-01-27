import styles from './ProgressBar.module.scss';
import {ReactComponent as InfoIcon} from "@icons/named_exported/info_icon.svg";
import {useFreelancerProfileService} from "@services/freelancerProfileService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import {useEffect, useState} from "react";

const ProgressBar = () => {

	const {getFreelancerProfileProgress, loadingStatus} = useFreelancerProfileService();

	const [progress, setProgress] = useState(0);

	useEffect(() => {
		getFreelancerProfileProgress()
			.then(response => setProgress(response))
			.catch(console.error);
	}, [getFreelancerProfileProgress]);

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={styles['bar']}>
			<div className={styles['bar__content']}>
				<div className={styles['bar__wrapper']}>
					<p className={styles['bar__text']}>Osiągnij wyższy poziom widoczności dla klientów</p>
					<InfoIcon width={15} height={14}/>
				</div>
				<p className={styles['bar__procent']}>
					{progress} / 100%
				</p>
			</div>
			<div className={styles['bar__progress']}>
				<div style={{width: `${progress}%`}} className={styles['bar__line']}></div>
			</div>
		</div>
	)
}

export default ProgressBar;