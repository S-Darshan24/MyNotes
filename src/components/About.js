import React from 'react';
//import NoteContext from '../Context/noteContext';

const About = () => { 
  return (
    <div>
     <div className="accordion accordion-flush" id="accordionFlushExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        <strong> Evernote </strong>
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">Evernote is a powerful and versatile tool designed for capturing, organizing, and sharing notes. It supports multiple formats, including text, images, voice recordings, PDFs, and web clippings. You can sync your notes across devices, making them accessible on desktops, tablets, and smartphones. Evernote also includes a robust search feature, allowing you to find content quickly, even within scanned documents. With collaboration features, it’s ideal for both personal and team use, enabling users to share and edit notes together in real-time. Whether you’re managing projects, brainstorming ideas, or keeping a personal journal, Evernote provides a seamless and user-friendly experience.</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        <strong>Google Keep</strong>
      </button>
    </h2>
    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">Google Keep is a lightweight, straightforward note-taking app that integrates seamlessly with the Google ecosystem. It allows users to create notes in the form of text, lists, images, and voice recordings. Notes can be color-coded, labeled, and pinned for better organization. Google Keep supports reminders and real-time collaboration, making it perfect for managing tasks and sharing ideas with others. Its intuitive interface and integration with Google Drive ensure your notes are always secure and accessible from any device with an internet connection. The app is particularly useful for users who value simplicity and efficiency.</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        <strong>Microsoft OneNote</strong>
      </button>
    </h2>
    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">Microsoft OneNote is a feature-rich note-taking application that works as a digital notebook. It allows users to create notes that can include text, drawings, screenshots, and multimedia recordings. Notes are organized into sections and pages, mirroring the structure of a traditional notebook. OneNote’s integration with Microsoft Office and cloud storage through OneDrive makes it a great tool for students, professionals, and teams. It also supports real-time collaboration, making it easy to share notebooks and work on them simultaneously with others. OneNote’s powerful search functionality and cross-platform availability ensure your notes are accessible and well-organized, wherever you go.</div>
    </div>
  </div>
</div>
    </div>
  )
}

export default About
