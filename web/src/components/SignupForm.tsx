import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../reducers/userReducer";
import { AppDispatch } from "../types";


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
        } catch {
            //
        }
    }

    return <div>
        <h1>Sign up</h1>
        <form onSubmit={handleSignups} action="/">
            <label htmlFor="">Username</label>
            <input {...username} />
            <label htmlFor="">Email</label>
            <input {...email} />
            <label htmlFor="">Password</label>
            <input {...password} />
            <input type="submit" />
        </form>
    </div>
}


