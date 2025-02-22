import { serverURL } from "../constants";
import { StudentInfo, StudentInfoWithoutId } from "../types";

const url = serverURL + "student"

const create = async (username: string, creds: StudentInfoWithoutId) => {
    console.log("Requesting to create student account")
    const { data } = await axios.post<StudentInfo>(`${url}/create/${username}`)
    return data
}

const update = async (username: string, creds: StudentInfoWithoutId) => {
    // TODO: Will make Update Function
    console.log("Requesting to update student account")
}

export default {
    create, update
}
