import React from "react";
import Note from "./Note.js";

const keepSearchMatches = (note) => note.doesMatchSearch;



const NotesList = (props) => {
  const renderNote = (note) => (
  <Note
    key={note.id}
    note={note}
    onType={props.onType} 
    remove={props.remove}/>
  );

  const filterNote = props.notes.filter(keepSearchMatches);
  const notesListElement = filterNote.map(renderNote);
  return <ul className="notes-list">{notesListElement}</ul>
};

export default NotesList;