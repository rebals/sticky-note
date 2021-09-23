import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = { 
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true,
      },
    ],
    searchText: ""
  };
 
  addNote = () => {
    const newNote =
    {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({notes:newNotes});
  };

  onType = (text,noteID,field) => {
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id === noteID) {
        if(field === "title") {
          note.title = text;
          return note;
        } else if (field === "description"){
          note.description = text;
          return note;
        } else {
          console.log("An error accured, please check the field.")
          return note;
        }        
      } else {
        return note;
      }
    })
    this.setState({notes: updatedNotes})
  };
 
  onSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if(!searchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(searchText);
        const descriptionMatch = description.includes(searchText);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
     this.setState({
      searchText: searchText,
      notes: updatedNotes
    });
  }

  remove = (clickedIndex) => {
    const filterCallback = (note) => note.id !== clickedIndex;
    const updatedNotes = this.state.notes.filter(filterCallback);
    this.setState({ notes: updatedNotes });
  };

  componentDidUpdate() {
    /* after each render, save notes data to local storage */
    const stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }
  componentDidMount() {
    /* after rendering for the first time, read saved
    notes data from local storage and pass that data
    to component state if it exists */
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      this.setState({ notes: savedNotes });
    }
  }

  render () {
    return (
      <div>
        <Header 
        searchText={this.state.searchText} 
        addNote={this.addNote}
        onSearch={this.onSearch}/>
        <NotesList onType={this.onType} notes={this.state.notes} remove={this.remove}/>
      </div>
    );
  } 
}

export default App;
