import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { reset: usernameReset, ...username } = useField("text");
  const { reset: passwordReset, ...password } = useField("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(username.value, password.value));
      navigate("/");
    } catch (err) {
      return;
    }
  };

  return (
    <div id="login">
      <h1 className="page-title">Welcome to Toruts, ka-peyups!</h1>
      <form onSubmit={handleLogin} id="login-form">
        <div>
          <span>Username:</span>
          <input {...username} data-testid="username" />
        </div>
        <div>
          <span>Password:</span>
          <input {...password} data-testid="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate("/signup")}>Sign up</button>
    </div>
  );
};

export default LoginForm;