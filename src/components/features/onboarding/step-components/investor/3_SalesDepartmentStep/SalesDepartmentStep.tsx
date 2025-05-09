import React, { useCallback, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IInvestorData } from "@shared/investor/common.ts";
import styles from './SalesDepartmentStep.module.scss';
import { ReactComponent as InfoIcon } from "@icons/named_exported/info_icon.svg";
import { useInvestorOnboardingService } from "@services/onboarding/investorOnboardingService.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";
import AddCompanyMails
	from "@components/features/onboarding/step-components/investor/3_SalesDepartmentStep/AddCompanyMails/AddCompanyMails.tsx";

const SalesDepartmentStep: React.FC<IStepComponentProps<IInvestorData>> = ({ userData, onSubmit }) => {

	const { patchSalesDepartment, patchCompanyMails } = useInvestorOnboardingService();

	const [ hasDepartment, setHasDepartment ] = useState<boolean | undefined>(userData.salesDepartment ?? undefined);
	const [ mails, setMails ] = useState<string[]>(userData.companyEmails?.split(',') ?? []);

	const patchEmails = useCallback(() => {
		patchCompanyMails(mails.join(','))
			.then(onSubmit)
			.catch(console.error);
	}, [ mails, onSubmit, patchCompanyMails ]);

	const handleSubmit = useCallback(() => {
		if (hasDepartment === undefined) return;

		patchSalesDepartment(hasDepartment)
			.then(() => {
				if (hasDepartment && mails.length > 0) {
					patchEmails();
				} else {
					onSubmit();
				}
			})
			.catch(console.error);
	}, [ hasDepartment, mails.length, onSubmit, patchEmails, patchSalesDepartment ]);


	const renderContent = () => {
		const options = [
			{
				text: 'Tak',
				value: true
			},
			{
				text: 'Nie',
				value: false
			}
		];

		return options.map(option => {
			const isActive = option.value === hasDepartment;
			return <OnboardingOption key={ option.text }
			                         isActive={ isActive }
			                         title={ option.text }
			                         onClick={ () => setHasDepartment(option.value) }/>
		});
	};

	const setCompanyMailsByIndex = (mail: string, index: number) => {
		setMails((prevState) => {
			const updated = [ ...prevState ];

			if (index < prevState.length) {
				updated[index] = mail;
			} else {
				updated.push(mail);
			}

			return updated;
		});
	};

	return (
		<div className={ styles['department'] }>
			<div className={ styles['department__info'] }>
				<InfoIcon width={ 14 } height={ 14 }/>
				<span>Do współpracy z freelancerami</span>
			</div>
			<div className={ styles['department__content'] }>
				{ renderContent() }
			</div>
			<AddCompanyMails isOpened={ hasDepartment ?? false }
			                 mails={ mails }
			                 onChange={ setCompanyMailsByIndex }/>
			<button className={ `btn 
								 btn--primary 
								 ${ styles['department__btn'] }` }
			        disabled={ hasDepartment === undefined }
			        onClick={ handleSubmit }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default SalesDepartmentStep;