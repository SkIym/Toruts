import { useField } from "../../hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../reducers/userReducer";
import { AppDispatch } from "../../../store";


export const SignUpForm = () => {
    const { reset: fnameReset, ...firstName } = useField("text")
    const { reset: lnameReset, ...lastName } = useField("text")
    const { reset: phoneReset, ...phoneNumber } = useField("text")
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
                password: password.value,
                firstName: firstName.value,
                lastName: lastName.value,
                phoneNumber: phoneNumber.value
            }))
            navigate("/choose_type")
        } catch {
            //
        }
    }

    return <div>
        <h1>Sign up</h1>
        <form onSubmit={handleSignups} action="/">
            <div>
                <span>First Name</span>
                <input {...firstName} data-testid="first-name"  pattern="[A-Za-z\s]+" title="Please enter only alphabetical characters."/>
            </div>
            <div>
                <span>Last Name</span>
                <input {...lastName} data-testid="last-name"  pattern="[A-Za-z\s]+" title="Please enter only alphabetical characters."/>
            </div>
            <div>
                <span>Phone Number</span>
                <input {...phoneNumber} data-testid="phone-number" pattern="[0-9]+" title="Please enter only numeric characters."/>
            </div>
            <div>
                <span>Username:</span>
                <input {...username} data-testid="username" />
            </div>
            <div>
                <span>Email:</span>
                <input {...email} data-testid="email" />
            </div>
            <div>
                <span>Password:</span>
                <input {...password} data-testid="password" />
            </div>
            <button type="submit">Sign up</button>
        </form>
        <button onClick={() => navigate("/login")}>Login instead</button>
    </div>
}


