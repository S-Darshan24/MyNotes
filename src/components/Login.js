import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const [creadentials, setcreadentials] = useState({email: "" , password: ""})
     let history = useNavigate()

    const handelsubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: creadentials.email, password: creadentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
            //save the auth token and rediract 
            localStorage.setItem('jwtdata', json.jwtdata);
            props.showalert("Login in successfully" ,"success")
             history("/");
            
        } else {
            props.showalert("invalid Details " ,"danger")        }
    }
    const onChange = (e) => {
        setcreadentials({ ...creadentials , [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h1> Login Page </h1>
            <form onSubmit={handelsubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={creadentials.email}  onChange={onChange} name="email" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"value={creadentials.password}onChange={onChange}  name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-outline-success">Submit</button>
            </form>
        </div>
    )
}

export default Login
