import axios from "axios";
import { accountApiBaseUrl } from "../constants";
import { SignupInfo } from "../types";
import { signupUser } from "../reducers/userReducer";

import { serverURL } from "../constants";

let token = null;

const setToken = async (newToken: string) => {
    token = `Bearer ${newToken}`;
};

const signup = async (creds: SignupInfo) => {
    console.log("Hello World!")
    const { data } = await axios.post<SignupInfo>(`${serverURL}${accountApiBaseUrl}`, creds)
    return data;
}

export default {
    signup, setToken
}
