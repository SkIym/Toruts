import SignUpForm from "../templates/SignupForm";
import { UserType } from "../../types";
import TutorForm from "../templates/TutorForm";
import StudentForm from "../templates/StudentForm";

const SignupPage = ({ type }: { type: UserType | null }) => {
  let child;

  switch (type) {
    case UserType.TUTOR:
      child = <TutorForm info={null} />;
      break;
    case UserType.STUDENT:
      child = <StudentForm info={null}/>;
      break;
    default:
      child = <div data-testid="page" id="signup"> <SignUpForm /> </div>
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 flex-col gap-y-9">
    <h1 className="page-title font-bold text-gray-900">Sign up</h1>
      <div className="w-full max-w-4xl shadow-lg rounded-sm p-8 bg-white">
        {child}
      </div>
    </div>
  );
};

export default SignupPage;