import styles from './AvatarEmptyState.module.scss';
import man from '@icons/freelancer_profile/avatar/man.svg';
import woman from '@icons/freelancer_profile/avatar/woman.svg';

const AvatarEmptyState = () => {

	return (
		<div className={styles['avatar-empty']}>
			<div className={styles['avatar-empty__wrapper']}>
				<img className={`${styles['avatar-empty__img']} ${styles['avatar-empty__img--left']}`} src={man} alt="man"/>
				<img className={`${styles['avatar-empty__img']} ${styles['avatar-empty__img--right']}`} src={woman} alt="woman"/>
			</div>
			<p className={styles['avatar-empty__text']}>
				Dodaj awatar
			</p>
		</div>
	);
}

export default AvatarEmptyState;