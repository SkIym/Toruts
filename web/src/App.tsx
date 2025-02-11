import { useEffect } from 'react'
import './App.css'
import './components/SignupForm'
import { useDispatch } from 'react-redux'
import { getLoggedInUser } from './reducers/userReducer'
import { Outlet } from 'react-router-dom'
import { AppDispatch } from '../store'

const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => 
    {
        const getUser = async () => {
            await dispatch(getLoggedInUser());
            console.log("getting loggedinuser...")
        }
        
        getUser();
    }, [dispatch])
    
    return (
        <>
            <Outlet></Outlet>
        </>
    )
}

export default App
