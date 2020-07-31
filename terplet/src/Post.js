import React from 'react'
import './Post.css'
import Card from '@material-ui/core/Card';


function Post({beds, baths, start, end, price, location, imageURL, caption}) {
    return (
        <Card className='post'>
            <h3>{location} - {price}</h3>
            
            <img className="post__image" src={imageURL} alt=""></img>
            <h4 className="post__text">{beds} bed, {baths} bath, {start} - {end}</h4>
            <h5>{caption}</h5>

            {/* num bed bath */}
            {/* date */}

        </Card>
    )
}

export default Post
