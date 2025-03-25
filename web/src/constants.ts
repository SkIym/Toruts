export const SERVER_URL = 'http://localhost:5177/api/'
export const API_ROUTES =
    { ACCOUNT:
        { login : `${SERVER_URL}account/login`
        , signup: `${SERVER_URL}account/signup`
        }
    , RECORD:
        { update: (username: string) => {return `${SERVER_URL}record/update/${username}`}
        , delete: (username: string) => { return `${SERVER_URL}record/delete/${username}`}
        }
    , STUDENT:
        { update: (username: string) => { return `${SERVER_URL}student/update/${username}`}
        , get: (username: string) => {return `${SERVER_URL}student/get/${username}`}
        , create: (username: string) => {return `${SERVER_URL}student/create/${username}`}
        }
    , TUTOR:
        { update: (username: string) => { return `${SERVER_URL}tutors/update/${username}`}
        , get: (username: string) => {return `${SERVER_URL}tutors/get/${username}`}
        , create: (username: string) => { return `${SERVER_URL}tutors/create/${username}`}
        , upload: (id: number) => `${SERVER_URL}tutors/upload/portrait/${id}`
        , search: `${SERVER_URL}tutors/search/`
        }
    , MATCH:
        { create: (username: string) => `${SERVER_URL}matches/create/${username}`
        }
    }
export const PATH = 
    { home: '/'
    , login: '/login'
    , select: '/select'
    , SIGNUP: 
        { default: '/signup'
        , tutor: '/signup/tutor'
        , student: '/signup/student'
        }
    , PROFILE: 
        { default: '/profile'
        , edit: '/profile/edit'
        }
    }
    
export const TEST =
    { page: (page: string) => `${page}-page`
    , form: (form: string) => `${form}-form`
    , button: (button: string) => `${button}-button`
    , input: (input: string) => `${input}-input`
    , select: (select: string) => `${select}-select`
    , profile: (profile: string) => `${profile}-profile`
    }
export const PORTRAIT = 
    {
        default: 'https://wzyrtbjdztiuwvspkoge.supabase.co/storage/v1/object/public/profile-pictures//default.jpg'
    }