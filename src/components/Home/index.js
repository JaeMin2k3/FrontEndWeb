import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Post from "../Post";
import "./index.css";

export default function Home({user}) {
    const [posts, setPosts] = useState([])
    useEffect(() => {
            async function fetchPost(){
                const res = await axios.get(
                    'http://localhost:8080/api/post/',
                    {
                        headers: {
                            Authorization: user.token
                        }
                    }
                )
                if(res.status === 200){
                    setPosts(res.data)
                }
            }
            if (user._id) fetchPost()
        }, [user]
    )
    return(
        user._id ?
        <div id="home">
            {
                posts.map((post) => (<Post user = {user} post = {post} />))
            }
        </div>
        : <Navigate to="/login" replace/>
    )
}