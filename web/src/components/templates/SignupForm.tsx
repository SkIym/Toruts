import { useDispatch } from "react-redux";
import { signupUser } from "../../reducers/userReducer";
import { AppDispatch } from "../../../store";
import { useNavigate } from "react-router-dom";
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
import { Input } from "@/components/ui/input";

const SignUpSchema = z.object({
    firstName: z
        .string()
        .nonempty({ message: "First Name is required" })
        .regex(/^[A-Za-z\s]+$/, "Please enter only alphabetical characters."),
    lastName: z
        .string()
        .nonempty({ message: "Last Name is required" })
        .regex(/^[A-Za-z\s]+$/, "Please enter only alphabetical characters."),
    phoneNumber: z
        .string()
        .nonempty({ message: "Phone Number is required" })
        .regex(/^[0-9]+$/, "Please enter only numeric characters."),
    username: z.string().nonempty({ message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .nonempty({ message: "Password is required" })
        .min(8)
        .regex(/(?=.*[^A-Za-z0-9])/, {
            message: "Password must contain at least one non-alphanumeric character.",
        }),
    confirmPassword: z.string()
        
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"]
    });

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

const SignupForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Set up the form using react-hook-form and zod for validation.
  const signUpForm = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  const handleSignup: SubmitHandler<SignUpSchemaType> = async (formData) => {
    try {
      await dispatch(
        signupUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      );
      navigate("/choose_type");
    } catch (err) {
      // Optionally handle errors here.
    }
  };

  return (
    <div id="signup">
      <Form {...signUpForm}>
        <form
          onSubmit={signUpForm.handleSubmit(handleSignup)}
          id="signup-form"
          data-testid="form"
          className="space-y-8"
        >
            <div className="grid grid-cols-3 gap-5">
                <FormField
                control={signUpForm.control}
                name="firstName"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                    <Input
                        placeholder="First Name"
                        {...field}
                        data-test-id="first-name"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={signUpForm.control}
                name="lastName"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                    <Input
                        placeholder="Last Name"
                        {...field}
                        data-test-id="last-name"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={signUpForm.control}
                name="phoneNumber"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                    <Input
                        placeholder="Phone Number"
                        {...field}
                        data-test-id="phone-number"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>
            <div className="grid grid-cols-2 gap-5">
                    <FormField
                    control={signUpForm.control}
                    name="username"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="Username"
                            {...field}
                            data-test-id="username"
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="Email" {...field} data-test-id="email" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-2 gap-5">
            <FormField
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input
                        placeholder="Password"
                        {...field}
                        data-test-id="password"
                        type="password"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={signUpForm.control}
                name="confirmPassword"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                    <Input
                        placeholder="Confirm Password"
                        {...field}
                        data-test-id="confirm-password"
                        type="password"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>
          <div className="flex flex-row gap-4 justify-between">
            <Button variant="outline" onClick={() => navigate("/login")} data-testid="login-button">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
              Login instead
            </Button>
            <Button type="submit" data-testid="signup-button">Sign up</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;