import React, { useState, useEffect, useContext } from 'react'
import './History.css'
import HistoryCard from './HistoryCard'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import PointsContext from '../../context/PointsContext'
const History = () => {

    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const ctx = useContext(PointsContext)

    const getData = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/images/${ctx.cookies.user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + ctx.cookies.token
                }

            })
            const obj = await response.json()
            setData(obj.data)
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Navbar page='history' />
            <div className='history-container'>
                <input placeholder="Search" className="input" onChange={(e) => setSearch(e.target.value)} type="text" />

                <div className='history-card'>
                    {
                        data && data.filter(item => {
                            return item.query.toLowerCase().includes(search.toLowerCase())
                        }).map(item => {
                            return <HistoryCard key={item._id} item={item} />
                        })
                    }
                </div>

                <button className="back-to-top-button" onClick={() => window.scrollTo(0, 0)}>
                    <svg className="svgIcon" viewBox="0 0 384 512">
                        <path
                            d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                        ></path>
                    </svg>
                </button>

            </div>
        </>
    )
}

export default History