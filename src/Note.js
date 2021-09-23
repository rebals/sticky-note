import React from "react";

const Note = (props) => {

  const updateTitle = (e) => {
    const text = e.target.value;
    console.log(text);
    props.onType(text, props.note.id, "title")
  };

  const updateDecription = (e) => {
    const text = e.target.value;
    props.onType(text, props.note.id, "description")
  };

  const deleteNote = () => props.remove(props.note.id);

  return (
  <li className="note">
        <input 
          className="note__title" 
          type="text" 
          placeholder="Title" 
          value={props.note.title}
          onChange={updateTitle}
        />
        <textarea 
          className="note__description" 
          placeholder="Description..." 
          value={props.note.description}
          onChange={updateDecription}
        />
        <span onClick={deleteNote} className="note__delete">X</span>
    </li>
  );
};

export default Note;