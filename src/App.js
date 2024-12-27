import './App.css';
import React, { useState } from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './Context/NotesState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  const [alert, setAlert] = useState(null);
  const showalert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);

  }
  return (
    <>
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showalert={showalert} />}>
              </Route>
              <Route exact path="/about" element={<About />}>
              </Route>
              <Route exact path="/login" element={<Login showalert={showalert}/>}>
              </Route>
              <Route exact path="/signup" element={<Signup showalert={showalert}/>}>
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
      </div>
    </>
  );
}

export default App;
