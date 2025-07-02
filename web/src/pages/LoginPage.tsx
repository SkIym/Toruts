import LoginForm from "../containers/LoginForm"
import { TEST } from "@/constants/constants"

const LoginPage = () => {

	return <div data-testid={TEST.page('login')} className="flex flex-auto h-10/11 w-full items-center justify-center p-6 md:p-10 flex-col">
		<div className="w-full max-w-sm">
			<LoginForm />
		</div>
	</div>

}

export default LoginPage
