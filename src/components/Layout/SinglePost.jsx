import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Css/SinglePost.css'

const SinglePost = () => {
    const [single,setSingle]=useState({})
    const dataAll=JSON.parse(localStorage.getItem("Post"));

    const {id}=useParams()
    
    useEffect(()=>{
        const exist=dataAll.find(data=>data.random==id)
        if(exist){
            setSingle(exist)
        }
    },[])

    return (
        <div className='h-[70vh] singlePost'>
            {
                single.title
            }
        </div>
    );
};

export default SinglePost;