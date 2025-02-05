import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../reducers/userReducer";


export const SignUpForm = () => {
    const { reset: usernameReset, ...username } = useField("text");
    const { reset: emailReset, ...email } = useField("text");
    const { reset: passwordReset, ...password } = useField("password");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignups = async (e) => {
        e.preventDefault()
        console.log("Handled")
        try {
            await dispatch(signupUser(email.value, username.value, password.value))
        } catch {
        }
    }

    return <div>
        Hello World!
        <form onSubmit={handleSignups} action="/">
            <input {...username} />
            <input {...email} />
            <input {...password} />
            <input type="submit" />
        </form>
    </div>
}


