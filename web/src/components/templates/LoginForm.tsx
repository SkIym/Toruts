import { useDispatch } from "react-redux";
import { loginUser } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const LoginForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const LogInSchema = z.object({
        username: z.string().nonempty({ message: "Username is required" }),
        password: z.string().nonempty({ message: "Password is required" })
    })

    const loginForm = useForm<LogInSchemaType>({  resolver: zodResolver(LogInSchema)})

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
            <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} data-testid="form" id="login-form" className="space-y-8">
                    <FormField
                        control = {loginForm.control}
                        name = "username"
                        render ={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} data-test-id="username"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control = {loginForm.control}
                        name = "password"
                        render ={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} data-test-id="password" type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row gap-4 justify-content">
                <button data-testid="login-button" type="submit">Login</button>
                        <Button type="submit" data-testid="login-button">Login</Button>
                        <Button variant="outline" onClick={() => navigate("/signup")} data-testid="signup-button">Sign up instead</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;
