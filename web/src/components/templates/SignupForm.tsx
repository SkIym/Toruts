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
  password: z.string().nonempty({ message: "Password is required" }),
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
      <h1 data-testid="heading">Sign up</h1>
      <Form {...signUpForm}>
        <form
          onSubmit={signUpForm.handleSubmit(handleSignup)}
          id="signup-form"
          data-testid="form"
          className="space-y-8"
        >
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
          <div className="flex flex-row gap-4 justify-between">
            <Button type="submit" data-testid="signup-button">Sign up</Button>
            <Button variant="outline" onClick={() => navigate("/login")} data-testid="login-button">
              Login instead
              </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;