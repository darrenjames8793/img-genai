import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import './Home.css'
const Home = () => {
    return (
        <div>
            <Navbar />
            <div className='home-container'>
                <div className='main'>
                    <h1>Generate <br /> Images <br /> on the go</h1><div />
                    <button className="learn-more">
                        <span className="circle" aria-hidden="true">
                            <span className="icon arrow"></span>
                        </span>
                        <Link to='/sign-up' className="button-text">Get Started</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home