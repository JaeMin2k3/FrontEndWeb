import axios from "axios"
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./index.css"
export default function New({ user }) {
    const [upload, SetUpload] = useState([])
    const caption = useRef()
    const navigate = useNavigate()

    async function handlePost(){
        if (caption.current.value === "") return;
        const formData = new FormData()
        upload.forEach((image) => {
            formData.append("image", image)
        })
        const res = await axios.post(
            'http://localhost:8080/api/upload/image',
            formData,
            {
                headers: {
                    Authorization: user.token
                }
            }
        )
        if (res.status === 200) {
            const resPost = await axios.post(
                'http://localhost:8080/api/post/',
                {
                    caption: caption.current.value,
                    images: upload.map((image) => (image.name))
                },
                {
                    headers: {
                        Authorization: user.token
                    }
                }
            )
            if (res.status === 200) {
                navigate(`/${user._id}`)
            }
        }
    }
    return (
        <div id="new-post-page">
            <div id="new-post-section">
                <header>
                    <img src={`http://localhost:8080/image/${user.profile_image}`} alt="" />
                    <Link to={`/${user._id}`}>{user.name}</Link>
                </header>
                <input type="text" ref={caption} placeholder="Your caption goes here ..."/>
                <figure>
                    {upload.map((image) => (<img src={URL.createObjectURL(image)}/>))}
                </figure>
                <footer>
                    <label>
                        Upload
                        <input type="file" onChange={(e) => {SetUpload([...e.target.files])}} multiple/>
                    </label>
                    <button onClick={handlePost}>Post</button>
                </footer>
            </div>
        </div>
    )
}