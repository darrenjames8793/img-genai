import React from 'react'
import { Link } from 'react-router-dom'
import './HistoryCard.css'
const HistoryCard = (props) => {
    const item = props.item
    return (
        <article className="card">
            <div className="card-img">
                <img src={item.imageUrl} className="card-imgs pv"></img>
            </div>

            <div className="project-info">
                <div className="flex">
                    <div className="project-title">{item.query}</div>
                    <span className="tag">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </article>

    )
}

export default HistoryCard