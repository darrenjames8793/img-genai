import React, { useContext } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import PointsContext from '../../context/PointsContext'

const Navbar = (props) => {
    const navigate = useNavigate()
    const ctx = useContext(PointsContext)

    const logout = () => {
        ctx.removeCookie('token')
        ctx.removeCookie('user')
        ctx.removeCookie('points')
        ctx.setIsLoggedIn(false)
        navigate('/login')
    }

    // const linksObj = {
    //     home: '/',
    //     image: '/image-generator',
    //     history: '/history',
    //     contact: '/contact',
    //     help: '/help'
    // }

    const links = [
        { key: 'image', url: '/image-generator', name: 'Generator' },
        { key: 'history', url: '/history', name: 'History' }
    ]


    return (
        <div className='header-container'>
            <div className='left'>
                <Link className='logo' to='/'>Img-GenAI</Link>
                {
                    ctx.isLoggedIn && links.map(link => {
                        return (
                            <Link key={link.key} className={props.page === link.key ? "active links" : "links"} to={link.url}>{link.name}</Link>
                        )
                    })
                }
                {/* OR
                <Link to='/' style={props.page === 'home' ? activeStyle : {}}>Home</Link>
                <Link to='/image-generator' style={props.page === 'image' ? activeStyle : {}}>Image Generator</Link>
                <Link to='/history' style={props.page === 'history' ? activeStyle : {}}>History</Link>
                <Link to='/contact' style={props.page === 'contact' ? activeStyle : {}}>Contact</Link>
                <Link to='/help' style={props.page === 'help' ? activeStyle : {}}>Help</Link>
                
                */}
            </div>
            <div>
                {
                    ctx.isLoggedIn ?
                        <>
                            <div className='right'>
                                <span>Coins: {ctx.userPoints}</span>
                                <button className="Btn" onClick={logout}>

                                    <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

                                    <div className="text">Logout</div>
                                </button>
                            </div>
                        </> :

                        <button className="cta" onClick={() => navigate('/login')}>
                            <span>Login</span>
                            <svg width="15px" height="10px" viewBox="0 0 13 10">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                        </button>
                }
            </div>
        </div>
    )
}

export default Navbar