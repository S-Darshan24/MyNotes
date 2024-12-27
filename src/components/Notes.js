import React, { useContext, useEffect, useRef, useState } from 'react';
import Noteitem from './Noteitem';
import noteContext from "../Context/noteContext";
import Addnote from './Addnote';
import { useNavigate } from 'react-router';

const Notes = (props) => {
  const context = useContext(noteContext)
  let history = useNavigate();
  const { notes, getnotes, editnote } = context;
  
  useEffect(() => {
    if(localStorage.getItem('jwtdata')){
      getnotes()
    } else{

     history("/login")
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updatenote = (currentnote) => {
    ref.current.click();
     setnote({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag:currentnote.tag})
    
  }

  const handleclick = () => {
    console.log("updating Note...", note)
    editnote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showalert("Updating Note Successfully","success")

  }
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <Addnote showalert={props.showalert} />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-etitle fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
      <h3>Your Notes</h3>
      <div className="container mx-2">
        {Array.isArray(notes) && notes.length === 0 && 'No Notes to Display'}
      </div>
      {Array.isArray(notes) ? (
        notes.map(note => (
          <Noteitem key={note._id} updatenote={updatenote} showalert={props.showalert} notes={note} />
        ))
      ) : (
         <div>No notes available</div>
      )}
    </div>
    </>
  )  //https://github.com/S-Darshan24/MyNotes.git
}

export default Notes
