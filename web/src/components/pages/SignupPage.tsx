import SignUpForm from "../templates/SignupForm";
import { UserType } from "../../types";
import TutorForm from "../templates/TutorForm";
import StudentForm from "../templates/StudentForm";
import { TEST } from "@/constants";

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
    <div data-testid={TEST.page('signup')} className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 flex-col">
      <div className="w-full max-w-4xl">
        {child}
      </div>
    </div>
  );
};

export default SignupPage;