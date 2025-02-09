import { useEffect } from 'react'
import './App.css'
import './components/SignupForm'
import { SignUpForm } from './components/SignupForm'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from './reducers/userReducer'
import { UnknownAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Outlet } from 'react-router-dom'

const App = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLoggedInUser());
        console.log()
    }, [])

    return (
        <>
            <Outlet></Outlet>
        </>
    )
}

export default App
