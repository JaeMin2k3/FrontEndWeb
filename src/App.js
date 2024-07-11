import { useRef, useState } from "react";
import { CgProfile } from 'react-icons/cg';
import { FaCirclePlus } from "react-icons/fa6";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import New from "./components/New";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Signup from "./components/Signup";

function App() {
  const [user, setUser] = useState({_id: null})
  const search = useRef()
  const navigate = useNavigate()
  return (
    <>
      {user._id && <nav>
        <div id="left-nav">
          <Link to="/"><img src="http://localhost:8080/image/logo.jpg"/></Link>
          <input type = 'text' placeholder='Search...' ref={search} onKeyDown={(e)=>{
            if(e.key === 'Enter') navigate(`/search?keyword=${search.current.value}`)}}/>
        </div>
        <div id="right-nav">
          <button><Link to = '/new'><FaCirclePlus transform="scale(2)" color="white"/></Link></button>
          <button><Link to = {`/${user._id}`} ><CgProfile transform="scale(2)" color="white"/></Link></button>
          <button onClick={()=>{setUser({_id: null}); navigate("/")}}>Log out</button>
        </div>
      </nav>}
      <Routes>
        <Route path = '/signup' element = {<Signup/>} />
        <Route path = '/login' element = {<Login setUser={setUser}/>} />
        <Route path = '/' element = {<Home user={user}/>} />
        <Route path = '/search' element = {<Search user={user}/>} />
        <Route path = '/:_id' element = {<Profile user = {user}/>} />
        <Route path = '/new' element = {<New user = {user}/>}/>
      </Routes>
    </>
  );
}
export default App;
