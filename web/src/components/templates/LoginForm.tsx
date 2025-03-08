import { useDispatch } from "react-redux";
import { loginUser } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "index.css";

const LoginForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const LogInSchema = z.object({
        username: z.string().nonempty({ message: "Username is required" }),
        password: z.string().nonempty({ message: "Password is required" })
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LogInSchemaType>({  resolver: zodResolver(LogInSchema)})

    type LogInSchemaType = z.infer<typeof LogInSchema>

    const handleLogin: SubmitHandler<LogInSchemaType> = async (formData) => {
        try {
            await dispatch(loginUser({
                username: formData.username,
                password: formData.password
            }));
            navigate("/");
        } catch (err) {
            return err;
        }
    };

    return (
        <div id="login">
            <h1 data-testid="heading" className="page-title">Welcome to Toruts, ka-peyups!</h1>
            <form onSubmit={handleSubmit(handleLogin)} data-testid="form" id="login-form">
                <div>
                    <span>Username:</span>
                    <input {...register("username")} data-testid="username" />
                    {errors.username && <span className="input-error" >{errors.username.message}</span>}
                </div>
                <div>
                    <span>Password:</span>
                    <input {...register("password")} data-testid="password" type="password"/>
                    {errors.password && <span className="input-error" >{errors.password.message}</span>}
                </div>
                <button data-testid="login-button" type="submit">Login</button>
            </form>
            <button data-testid="signup-button" onClick={() => navigate("/signup")}>Sign up</button>
        </div>
    );
};

export default LoginForm;
