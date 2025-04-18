import { useDispatch } from "react-redux";
import { loginUser } from "../app/redux/userReducer";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PATH, TEST } from "@/constants/constants";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const LogInSchema = z.object({
    username: z.string().nonempty({ message: "required" }),
    password: z.string().nonempty({ message: "required" }),
  });

  const loginForm = useForm<LogInSchemaType>({
    resolver: zodResolver(LogInSchema),
  });

  type LogInSchemaType = z.infer<typeof LogInSchema>;

  const handleLogin: SubmitHandler<LogInSchemaType> = async (formData) => {
    try {
      await dispatch(
        loginUser({
          username: formData.username,
          password: formData.password,
        })
      );
      navigate("/");
    } catch (err) {
      return err;
    }
  };

  return (
    <div id="login" data-testid={TEST.form("login")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(handleLogin)}
              data-testid={TEST.form("login")}
              id="login-form"
              className="space-y-8"
            >
              <FormField
                control={loginForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row justify-between">
                      <FormLabel>Username</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        data-testid={TEST.input("username")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row justify-between">
                      <FormLabel>Password</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        data-testid={TEST.input("password")}
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-4 justify-between">
                <Button type="submit" data-testid={TEST.button("login")}>
                  Login
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/signup")}
                  data-testid={TEST.button("signup")}
                >
                  Sign up instead
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
