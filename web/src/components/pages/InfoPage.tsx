import { InfoForm } from "../templates/InfoForm";
import TutorForm from "../templates/TutorForm";
import StudentForm from "../templates/StudentForm";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { UserType, TutorInfo, StudentInfo } from "@/types";

const InfoPage = () => {
    const user = useSelector((state: RootState) => state.user);
    return <div>
        <div data-testid="page" id="edit">
            <InfoForm />
        </div>
        <div>
        <h2 data-testid="role-heading">Updating your role information:</h2>
        {user?.userType === UserType.TUTOR 
        ? <TutorForm info={user.roleInfo as TutorInfo}></TutorForm>
        : <StudentForm info={user?.roleInfo as StudentInfo}></StudentForm>}
        </div>
    </div>

}

export default InfoPage
