export interface SignupInfo {
    username: string;
    email: string;
    password: string;
}
export interface LoginInfo {
    username: string;
    password: string;
}

export enum UserType {
    TUTOR = 0,
    STUDENT = 1,
}

export type UserData = {
    userName: string;
    email: string;
    token: string;
    userType: UserType | null;
    primaryInfo: UserInfo | null
    roleInfo: TutorInfo | StudentInfo | null
}

export type UserInfo = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export type StudentInfo = {
    id: number,
    areasOfImprovement: string[],
    degreeProgram: string
}

export type StudentInfoWithoutId = Omit<StudentInfo, 'id'>

export type TutorInfo = {
    id: number,
    educAttainment: string,
    learningMode: number,
    venue: string,
    price: number,
    areasOfExpertise: string[],
    tutoringExperiences: string,
    availability: string,
    portraitUrl: string,
    status: number
}

export type TutorInfoWithoutId = Omit<TutorInfo, 'id'>

export interface ToggleObject {
    toggleVisibility: () => void 
    setInvisible: () => void
}