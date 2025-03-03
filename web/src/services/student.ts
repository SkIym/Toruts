import axios from "axios";
import { serverURL } from "../constants";
import { StudentInfo, StudentInfoWithoutId } from "../types";

const url = serverURL + "student"

const create = async (username: string, creds: StudentInfoWithoutId) => {
    console.log("Requesting to create student account")
    const { data } = await axios.post<StudentInfo>(`${url}/create/${username}`, creds)
    return data
}

const update = async (username: string, creds: StudentInfoWithoutId) => {
    console.log("Requesting to update student account")
    const { data } = await axios.put<StudentInfo>(`${url}/update/${username}`, creds)
    return data
}

const find = async (username: string) => {
    const { data } = await axios.get<StudentInfo | null>(`${url}/get/${username}`)
    if (data) {
        return true
    } else {
        return false
    }
}

const get = async (username: string) => {
    const { data } = await axios.get<StudentInfo>(`${url}/get/${username}`)
    return data;
}

export default {
    create, update, find, get
}
