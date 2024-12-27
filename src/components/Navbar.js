import React,{useState}from 'react';
import {Link ,useNavigate } from "react-router-dom";


const Navbar = (props) => {
  const [mode, setmode] = useState({
    color: "black",
    backgroundColor: "black",
  });
  const [btntext, setbtntxt] = useState("Light");

  let history = useNavigate();
  const handellogout = () =>{
    localStorage.removeItem('jwtdata');
    history('/login ');
  }

  const darkmode = () =>{
    if(mode.color === "black"){
      setmode({
        color: "white",
        backgroundColor: "black"
        })
        document.body.style.backgroundColor = "#0a0b34"; // Dark mode background
      document.body.style.color = 'white'; // Dark mode text color
        document.querySelector('.btn').style.backgroundColor = "black";
        document.querySelector('.btn').style.color = "white";
        setbtntxt("Dark")


    } else{
      setmode({
        color: "black",
        backgroundColor: "white",
        })
        document.body.style.backgroundColor = "white"; // Light mode background
      document.body.style.color = 'black'; // Light mode text color
        document.querySelector('.btn').style.backgroundColor = "white"
        document.querySelector('.btn').style.color = "black"
        setbtntxt("Light")

    }

  }

  return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/"> <strong>MyNotes.com</strong></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <button type="button" className="btn btn-light mx-2" style={{border:"none", width:"4rem"}} onClick={darkmode}>{btntext}</button>
        </ul>
       {!localStorage.getItem('jwtdata')?<form className="d-flex">
        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1" to="/Signup" role="button">Sign Up</Link>
        </form>: <button onClick={handellogout} className='btn btn-primary'>Logout</button>}
      </div>
    </div>
  </nav>
  )
}

export default Navbar
