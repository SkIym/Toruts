import LoginForm from "../templates/LoginForm"
import { TEST } from "@/constants"

const LoginPage = () => {

    return <div data-testid={TEST.page('login')} className="flex flex-auto h-10/11 w-full items-center justify-center p-6 md:p-10 flex-col">
        <h1 className="page-title font-bold text-gray-900 mb-1.5">Welcome to Toruts, ka-peyups!</h1>
        <div className="w-full max-w-sm">
        <LoginForm />
        </div>
  </div>

}

export default LoginPage
