import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Post from "../Post"
import "./index.css"

export default function Profile({user}) {
    const [profile, setProfile] = useState({user: {}, posts:[]})
    const {_id} = useParams()
    useEffect(()=>{
        async function fetchProfile(){
            const res = await axios.get(
                `http://localhost:8080/api/user/${_id}`,
                {
                    headers:{
                        Authorization: user.token
                    }
                }
            )
            if(res.status === 200) setProfile(res.data)
        }
        if(user._id) fetchProfile()
    },[_id])
    return(
        <div id="profile-page">
            <div id="user-section">
                <img src= {`http://localhost:8080/image/${profile.user.profile_image}`}/>
                <Link>{profile.user.name}</Link>
            </div>
            <div id="post-section">
                {profile.posts.map((post)=> <Post className="post" user={user} post={post}/>)}
            </div>
        </div>
    )
}