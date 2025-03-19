import LoginForm from "../templates/LoginForm"

const LoginPage = () => {

    return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 flex-col gap-y-9">
            <h1 className="page-title font-bold text-gray-900">Welcome to Toruts, ka-peyups!</h1>
            <div className="w-full max-w-sm shadow-lg rounded-sm p-8 bg-white" data-testid="page">
                <LoginForm />
            </div>
    </div>

}

export default LoginPage
