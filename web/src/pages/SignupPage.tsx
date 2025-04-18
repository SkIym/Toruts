import SignUpForm from "../containers/SignupForm";
import { UserType } from "../types/types";
import TutorForm from "../containers/TutorForm";
import StudentForm from "../containers/StudentForm";
import { TEST } from "@/constants/constants";

const SignupPage = ({ type }: { type: UserType | null }) => {
  let child;

  switch (type) {
    case UserType.TUTOR:
      child = <TutorForm />;
      break;
    case UserType.STUDENT:
      child = <StudentForm/>;
      break;
    default:
      child =  <SignUpForm />;
  }

  return (
    <div data-testid={TEST.page('signup')} className="flex flex-auto h-10/11 w-full items-center justify-center p-6 md:p-10 flex-col">
      <div className="w-full max-w-4xl">
        {child}
      </div>
    </div>
  );
};

export default SignupPage;