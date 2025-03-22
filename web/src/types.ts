export interface SignupInfo {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}
export interface LoginInfo {
    username: string;
    password: string;
}

export enum UserType {
    TUTOR = 0,
    STUDENT = 1,
}

export enum Status {
    Active = 0,
    Inactive = 1,
    Pending = 2
}

export enum LearningMode {
    Online = 0,
    F2F = 1,
    Hybrid = 2
}

export type UserData = {
    userName: string;
    email: string;
    token: string;
    userType: UserType | null;
    primaryInfo: UserInfo | null
    roleInfo: TutorInfo | StudentInfo | null
    dual: boolean;
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

export interface TutorInfo {
    id: number,
    educAttainment: string,
    learningMode: number,
    venue: string,
    price: number,
    areasOfExpertise: string[],
    tutoringExperiences: string,
    availability: string,
    portraitUrl?: string,
    status: number
}

export function isTutorInfo(object: TutorInfo | StudentInfo): object is TutorInfo {
    return 'price' in object;
}

export type TutorInfoUpload = Omit<TutorInfo, 'portraitUrl'>

export type TutorResult = TutorInfo & {user: UserInfo}

export type TutorInfoWithoutId = Omit<TutorInfoUpload, 'id'>

export interface ToggleObject {
    toggleVisibility: () => void
    setInvisible: () => void
}

export type TutorSearch = {
    query: string,
    minPrice: number | null,
    maxPrice: number | null
}
