import axios from 'axios'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
export default function Signup() {
    const username = useRef()
    const password = useRef()
    const name = useRef()
    const [err, setErr] = useState('')
    const nav = useNavigate();

    async function handleSignup(){
        try{
            const res = await axios.post(
                'http://localhost:8080/api/user/signup',
                {
                    username: username.current.value,
                    password: password.current.value,
                    name: name.current.value
                }
            )
            if(res.status === 200 ) {
                nav("/login");
            }
        } catch (err) {
            setErr(err.response.data);
        }
    }
    return(
        <div id='signup-page'>
            <div className='container'>
                <em>{err}</em>
                <label>Name</label>
                <input type='text' ref={name}/>
                <label>UseName</label>
                <input type='text' ref={username}/>
                <label>PassWord</label>
                <input type='password' ref={password}/>
                <button onClick = {handleSignup}>Signup</button>
            </div>
        </div>
    )
}