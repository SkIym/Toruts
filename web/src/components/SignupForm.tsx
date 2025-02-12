import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../reducers/userReducer";
import { AppDispatch } from "../../store";


export const SignUpForm = () => {
    const { reset: usernameReset, ...username } = useField("text");
    const { reset: emailReset, ...email } = useField("text");
    const { reset: passwordReset, ...password } = useField("password");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSignups = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Handling...")
        try {
            await dispatch(signupUser({
                username: username.value, 
                email: email.value, 
                password: password.value}))
            navigate("/profile")
        } catch {
            //
        }
    }

    return <div>
        <h1>Sign up</h1>
        <form onSubmit={handleSignups} action="/">
            <div>
                <span>Username:</span>
                <input {...username} data-testid="username" />
            </div>
            <div>
                <span>Email:</span>
                <input {...email} data-testid="username" />
            </div>
            <div>
                <span>Password:</span>
                <input {...password} data-testid="password" />
            </div>
            <input type="submit" />
        </form>
        <button onClick={() => navigate("/login")}>Login instead</button>
    </div>
}


