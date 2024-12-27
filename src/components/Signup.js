import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [creadentials, setcreadentials] = useState({ name: "", email: "", password: "", cpassword: ""})
      const  history = useNavigate();
  
      const handelsubmit = async (e) => {
          e.preventDefault();
        const  {name, email, password}= creadentials
          const response = await fetch("http://localhost:5000/api/auth/createuser", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name,email,password })
          });
  
          const json = await response.json();
          console.log(json);
          if (json.success){
            // save the auth token and redreact
              localStorage.setItem("token", json.authtoken);
            history("/");
            props.showalert(" successfully Create Accunt" ,"success")
              
          } else {
              props.showalert(" invalid creadentials" ,"warning")
          }
      }
      const onChange = (e) => {
          setcreadentials({ ...creadentials , [e.target.name]: e.target.value })
      }

  return (
    <div>
    <div className='container'>
      <h1>Signup</h1>
      <form onSubmit={handelsubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name"onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
        </div>

        <button type="submit" className="btn btn-outline-success">Submit</button>
      </form>
    </div>
    </div>
  )
}

export default Signup
