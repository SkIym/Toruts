import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { useEffect, useState } from 'react'
import { getLoggedInUser } from './reducers/userReducer'
import { Toaster } from "@/components/ui/sonner"
import "./index.css"
import NavBar from "./components/ui/navigationBar"

const App = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [isReady, setIsReady] = useState(false);
    const location = useLocation();
    const hideNavBarRoutes = ['/login', '/signup'];

    useEffect(() => {
        const getUser = async () => {
            await dispatch(getLoggedInUser());
            console.log("getting loggedinuser...")
        }

        getUser();
        setIsReady(true);
    }, [dispatch])

    if (!isReady) {
        return <div>Loading...</div>
    }

    return isReady ? (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <NavBar />
            <Outlet />
            <Toaster position='top-right'/>
        </div>
            
    ) : null
}

export default App
