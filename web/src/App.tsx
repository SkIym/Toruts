import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { useEffect, useState } from 'react'
import { getLoggedInUser } from './reducers/userReducer'
import { ToastContainer } from 'react-toastify'

const App = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [isReady, setIsReady] = useState(false);

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
        <>
            <Outlet />
            <ToastContainer />
        </>
    ) : null
}

export default App
