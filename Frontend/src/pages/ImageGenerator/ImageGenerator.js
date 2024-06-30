require('dotenv').config()

import React, { useContext, useEffect, useState } from 'react'
import './ImageGenerator.css'
import Navbar from '../../components/Navbar/Navbar';
import PointsContext from '../../context/PointsContext';

const ImageGenerator = () => {
    const [data, setData] = useState("");
    const [searchText, setSearchText] = useState()

    const ctx = useContext(PointsContext)

    const getData = async () => {
        if (!searchText) return
        const res = await fetch(`${process.env.BACKEND_URL}/api/v1/images`, {
            method: 'POST',
            body: JSON.stringify({
                searchText,
                userId: ctx.cookies.user
            }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + ctx.cookies.token
            }
        });
        const d = await res.json();
        console.log(d)

        if (d?.status === 'success') {
            setData(d.data.imageUrl)
            ctx.setUserPoints(d.data.tokens)
            ctx.setCookie('points', d.data.tokens)
        }
    }


    return (
        <>
            <Navbar page="image" />
            <div className='image-generator-main-container'>
                <div className="messageBox">
                    <input required="" placeholder="Message..." type="text" id="txtQuery" onChange={(e) => setSearchText(e.target.value)} />
                    <button id="sendButton" onClick={getData}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                            <path
                                fill="none"
                                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                            ></path>
                            <path
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="33.67"
                                stroke="#6c6c6c"
                                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                            ></path>
                        </svg>
                    </button>

                </div>

                {/* If data, display */}
                {data && <img src={data} alt="Image" height={400} />}
                {/* If no data, display loader */}
                {/* {!data && <Loader />} */}
            </div>

        </>
    )
}

export default ImageGenerator