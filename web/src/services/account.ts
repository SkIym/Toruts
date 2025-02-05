import axios from "axios";
import { accountApiBaseUrl } from "../constants";
import { SignupInfo } from "../types";

let token = null;

const setToken = async (newToken: string) => {
    token = `Bearer ${newToken}`;
};

const signup = async (creds: SignupInfo) => {
    const { data } = await axios.post<SignupInfo>(`${accountApiBaseUrl}`, creds)
    return data;
}

export default {
    signup, setToken
}