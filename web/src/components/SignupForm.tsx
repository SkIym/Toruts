import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const { reset: usernameReset, ...username } = useField("text");
    const { reset: passwordReset, ...password } = useField("password");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            await dispatch(s)
        }
    }
}