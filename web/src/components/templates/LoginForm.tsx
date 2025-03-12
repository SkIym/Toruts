import { useField } from "../../hooks";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";

const LoginForm = () => {
    const { reset: usernameReset, ...username } = useField("text");
    const { reset: passwordReset, ...password } = useField("password");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(loginUser({
                username: username.value,
                password: password.value
            }));
            navigate("/");
            usernameReset()
            passwordReset()
        } catch (err) {
            return err;
        }
    };

    return (
        <div id="login">
            <h1 data-testid="heading" className="page-title">Welcome to Toruts, ka-peyups!</h1>
            <form onSubmit={handleLogin} id="login-form">
                <div>
                    <span>Username:</span>
                    <input {...username} data-testid="username" />
                </div>
                <div>
                    <span>Password:</span>
                    <input {...password} data-testid="password" />
                </div>
                <button data-testid="login-button" type="submit">Login</button>
            </form>
            <button data-testid="signup-button" onClick={() => navigate("/signup")}>Sign up</button>
        </div>
    );
};

export default LoginForm;
