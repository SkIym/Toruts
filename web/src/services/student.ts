import axios from "axios";
import { API_ROUTES } from "../constants";
import { StudentInfo, StudentInfoWithoutId } from "../types";

const create = async (username: string, creds: StudentInfoWithoutId) => {
    console.log("Requesting to create student account")
    const { data } = await axios.post<StudentInfo>(`${API_ROUTES.STUDENT.create(username)}`, creds)
    return data
}

const update = async (username: string, creds: StudentInfoWithoutId) => {
    console.log("Requesting to update student account")
    const { data } = await axios.put<StudentInfo>(`${API_ROUTES.STUDENT.update(username)}`, creds)
    return data
}

const find = async (username: string) => {
    const { data } = await axios.get<StudentInfo | null>(`${API_ROUTES.STUDENT.get(username)}`)
    if (data) {
        return true
    } else {
        return false
    }
}

const get = async (username: string) => {
    const { data } = await axios.get<StudentInfo>(`${API_ROUTES.STUDENT.get(username)}`)
    return data;
}

export default {
    create, update, find, get
}
