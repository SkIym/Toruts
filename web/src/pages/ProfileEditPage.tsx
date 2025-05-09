import { ProfileEditForm } from "../containers/ProfileEditForm";
import TutorForm from "../containers/TutorForm";
import StudentForm from "../containers/StudentForm";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { UserType, TutorInfo, StudentInfo } from "@/types/types";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PATH, TEST } from "@/constants/constants";

const InfoPage = () => {
	const user = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();
	return <div data-testid={TEST.page('profile-edit')} className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 flex-col gap-5">
		<div className="flex flex-row gap-5">
			<Button
				type="button"
				variant="outline"
				onClick={() => navigate(`${PATH.PROFILE.default}`)}
				data-testid={TEST.button('back')}
			>
				<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                  Back to Profile
			</Button>
			<Button
				type="button"
				variant="default"
				onClick={() => navigate(`${PATH.PROFILE.default}`)}
				data-testid={TEST.button('done')}
			>
                  Done
			</Button>
		</div>
		<div className="flex flex-col xl:flex-row gap-5">
			{user?.userType === UserType.TUTOR 
				? <TutorForm info={user.roleInfo as TutorInfo}></TutorForm>
				: <StudentForm info={user?.roleInfo as StudentInfo}></StudentForm>}
			<ProfileEditForm />         
		</div>
	</div>

}

export default InfoPage
