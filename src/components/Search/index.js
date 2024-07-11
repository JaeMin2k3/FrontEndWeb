import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./index.css"

export default function Search({user}) {
    const navigate = useNavigate()
    if (!user._id) {
        navigate("/login")
    }
    const useQuery = () => new URLSearchParams(useLocation().search)
    const keyword = useQuery().get("keyword")
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function fetchUser() {
            const res = await axios.get(
                `http://localhost:8080/api/user/search?keyword=${keyword}`,
                {
                    headers: {
                        Authorization: user.token
                    }
                }
            )
            if (res.status === 200) {
                setUsers(res.data)
            }
        }
        fetchUser()
    },[keyword])
    return (
        <div id="search-page">
            {users.map((u) => (<div className="search-result">
                <img src={`http://localhost:8080/image/${u.profile_image}`} alt="" />
                <Link to={`/${u._id}`}>{u.name}</Link>
                </div>))}
        </div>
    )
}