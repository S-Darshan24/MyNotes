import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial)

  //get all notes
  const getnotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/Notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
       // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YWE5ZGVkNTRmOTBiN2M0MWU1Y2Q5In0sImlhdCI6MTczMzk5NTAwOX0.7gWDvGh_iddgOKQg2NxCWAGmV2ENWXqh7DrgE7qZ4eI"
       "auth-token": localStorage.getItem('jwtdata')
      }
    });
    const json = await response.json()
    setnotes(json)
  }

  //  Add a Note
  const addnote = async (title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/Notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YWE5ZGVkNTRmOTBiN2M0MWU1Y2Q5In0sImlhdCI6MTczMzk5NTAwOX0.7gWDvGh_iddgOKQg2NxCWAGmV2ENWXqh7DrgE7qZ4eI"
        "auth-token": localStorage.getItem('jwtdata')

      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json()
    setnotes(notes.concat(note))
  }
 
  // Delete a Note
  const deletenote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
       // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YWE5ZGVkNTRmOTBiN2M0MWU1Y2Q5In0sImlhdCI6MTczMzk5NTAwOX0.7gWDvGh_iddgOKQg2NxCWAGmV2ENWXqh7DrgE7qZ4eI"
      "auth-token": localStorage.getItem('jwtdata')
      }
    });
    const json = response.json();
    console.log(json)
    const newnotes = notes.filter((notes) => { return notes._id !== id });
    setnotes(newnotes)
  }
  // Edit a Note
  const editnote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/notesupdata/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      //  "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YWE5ZGVkNTRmOTBiN2M0MWU1Y2Q5In0sImlhdCI6MTczMzk5NTAwOX0.7gWDvGh_iddgOKQg2NxCWAGmV2ENWXqh7DrgE7qZ4eI"
     "auth-token": localStorage.getItem('jwtdata')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json)

    let newnotes = JSON.parse(JSON.stringify(notes))

    //logic to edit in client
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
     
    }
      setnotes(newnotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;
