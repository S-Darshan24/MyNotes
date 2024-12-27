import React, { useContext } from 'react';
import noteContext from "../Context/noteContext";
//import NoteContext from "./noteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deletenote } = context;
    const { notes, updatenote } = props;
    //  const {note} = props
    //   const deletenote = (e) => {
    //     e.preventDefault();
    //     console.log("Delete clicked for note:", notes._id);
    //     // deletenote(notes._id); // Pass the note ID to the deletenote function
    //   };

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{notes.title}</h5>
                        <button type="submit" className="btn" onClick={() => { deletenote(notes._id); props.showalert("Deleting Note successfully", "success") }}> <span> <i className="fa-solid fa-trash mx-2" style={{ cursor: ' pointer' }} ></i></span></button>
                        <button type="submit" className="btn" onClick={() => { updatenote(notes) }}> <span><i className="fa-regular fa-pen-to-square"></i></span></button>
                    </div>
                    <p className="card-text">{notes.description}</p>

                </div>
            </div>
        </div>
    )
}
export default Noteitem;
