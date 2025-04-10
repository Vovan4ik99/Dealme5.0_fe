import { IActivityRequest, IFreelancerActivity } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";

export interface IEditActivitiesModalItemProps extends ISaveableChildProps {
	onSave: (request: IActivityRequest[]) => void;
}

export interface IDraggableActivity extends IFreelancerActivity {
	id: number;
}