import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import ImageGenerator from './pages/ImageGenerator/ImageGenerator'
import History from './pages/History/History'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import PointsContext from './context/PointsContext'
import SignUp from './pages/SignUp/SignUp'
const parent = document.getElementById('root')
const root = ReactDOM.createRoot(parent)
import { CookiesProvider, useCookies } from 'react-cookie'


const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'token', 'points'])

    const [isLoggedIn, setIsLoggedIn] = useState(() => cookies.token ? true : false)
    const [userPoints, setUserPoints] = useState()
    useEffect(() => {
        setUserPoints(cookies.points)
    }, [cookies.points])


    const router = createBrowserRouter([
        {
            path: '/',
            element: !isLoggedIn ? <Home /> : <Navigate to='/image-generator' />
        },
        {
            path: '/image-generator',
            element: isLoggedIn ? <ImageGenerator /> : <Navigate to='/login' />
        },
        {
            path: '/history',
            element: isLoggedIn ? <History /> : <Navigate to='/login' />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/sign-up',
            element: <SignUp />
        }
    ])
    return (
        <CookiesProvider>
            <PointsContext.Provider value={{
                userPoints,
                setUserPoints,
                isLoggedIn,
                setIsLoggedIn,
                cookies,
                setCookie,
                removeCookie
            }}>
                <RouterProvider router={router} />
            </PointsContext.Provider>
        </CookiesProvider>
    )
}

root.render(<App />)
