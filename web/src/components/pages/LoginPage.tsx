import LoginForm from "../templates/LoginForm"

const LoginPage = () => {

    return <div data-testid="page" id="login" className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 flex-col gap-y-9">
            <h1 className="page-title">Welcome to Toruts, ka-peyups!</h1>
            <div className="w-full max-w-sm shadow-lg rounded-sm p-8">
                <LoginForm />
            </div>
    </div>

}

export default LoginPage
