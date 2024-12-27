import React, { useState, useContext } from 'react'
import noteContext from "../Context/noteContext";

const Addnote = (props) => {
    const context = useContext(noteContext)
    const { addnote } = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const handleclick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" })
        props.showalert("Added Successfully","success")

    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h2>Add a Notes</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange} minLength={5} required />
                </div>

                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleclick}> Add Note </button>
            </form>
        </div>
    )
}

export default Addnote
