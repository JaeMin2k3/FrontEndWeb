import axios from 'axios'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './index.css'
export default function Login({setUser}) {
    const username = useRef()
    const password = useRef()
    const [err, setErr] = useState('')
    const nav = useNavigate()

    async function handleLogin() {
        try {
            const res = await axios.post(
                'http://localhost:8080/api/user/login',
                {
                    username: username.current.value,
                    password: password.current.value
                }
            )
            if (res.status === 200) {
                setUser(res.data)
                nav('/')
            }
        } catch (error) {
            setErr(error.response.data)
        }
    }
    return (
        <div id="login-page">
            <div className="login-container">
                <em>{err}</em>
                <label>UseName</label>
                <input type='text' ref={username} />
                <label>PassWord</label>
                <input type='password' ref={password} onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin()
                }}/>
                <button onClick={handleLogin}>Login</button>
                <div>
                    Don't have an account? Let's <Link to="/signup">sign up</Link>
                </div>
            </div>
        </div>
    )
}