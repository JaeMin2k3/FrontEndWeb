import axios from 'axios';
import { useRef, useState } from 'react';
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import './index.css';
export default function Post({ user, post }) {
    const [image, setImage] = useState(0)
    const [like, setLike] = useState(post.likes.some((user_id) => (user_id === user._id)))
    const [commentActive, setCommentActive] = useState(false)
    const [comments, setComments] = useState(post.comments)
    const comment = useRef()
    async function handleLike() {
        const res = await axios.post(
            `http://localhost:8080/api/post/${post._id}`,
            {
                like: !like
            },
            {
                headers: {
                    Authorization: user.token
                }
            }
        )
        if (res.status === 200) {
            setLike(!like)

        }
    }

    async function handleComment() {
        const res = await axios.post(
            `http://localhost:8080/api/post/${post._id}`,
            {
                comment: comment.current.value
            },
            {
                headers: {
                    Authorization: user.token
                }
            }
        )
        if (res.status === 200) {
            setComments((prev) => ([...prev, res.data]))
            comment.current.value = ""
        }
    }

    return (
        <div className='post'>
            <header>
                <img src={`http://localhost:8080/image/${post.user_profile_image}`} alt="" />
                <Link to={`/${post.user_id}`}>{post.user_name}</Link>
            </header>
            <figure>
                <figcaption>{post.caption}</figcaption>
                <img src={`http://localhost:8080/image/${post.images[image]}`} alt="" onClick={() => {
                    setImage((prev) => (prev === post.images.length - 1 ? 0 : prev + 1))
                }} />
            </figure>
            <footer>
                <div id="reaction-section">
                    <button onClick={handleLike}>{like ? <FaHeart /> : <FaRegHeart />}</button>
                    <button onClick={() => { setCommentActive(!commentActive) }}><FaRegComment /></button>
                </div>
                {commentActive && 
                <div >
                    <input type="text" placeholder='Comment here' ref={comment} onKeyDown={(e) => {
                        if (e.key === "Enter") handleComment()
                    }} />
                    <div id="comment-section">
                    {comments.map((comment) => (
                        <div className='comment'>
                            <header>
                                <img src={`http://localhost:8080/image/${comment.user_profile_image}`} alt="" />
                                <Link to={`/${comment.user_id}`} >{comment.user_name}</Link>
                            </header>
                            <p>{comment.comment}</p>
                        </div>
                    ))}
                    </div>
                </div>
                }
            </footer>
        </div>
    )
}