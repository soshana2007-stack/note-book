import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function Add() {
    if (title.trim() !== "" && text.trim() !== "") {
      const newNote = {
        title: title,
        text: text
      };

      setNotes([...notes, newNote]);
      setTitle("");
      setText("");
    }
  }

  function Delete(index) {
    const newNotes = [...notes];

    newNotes.splice(index, 1);

    setNotes(newNotes);
  }

  function Edit(index) {
    setTitle(notes[index].title);
    setText(notes[index].text);
    setEditIndex(index);
  }

  function Update() {
    if (title.trim() !== "" && text.trim() !== "") {
      const newNotes = [...notes];

      newNotes[editIndex] = {
        title: title,
        text: text
      };

      setNotes(newNotes);
      setTitle("");
      setText("");
      setEditIndex(-1);
    }
  }

  return (
    <div className="notes-container">

      <h1>Notes App</h1>

      <div className="input-section">

        <input
          type="text"
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={text}
          placeholder="Enter your note"
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {editIndex === -1 ? (
          <button onClick={Add}>Add</button>
        ) : (
          <button onClick={Update}>Update</button>
        )}

      </div>

      <div className="note-list">

        {notes.map((note, index) => (
          <div className="note-box" key={index}>

            <h2>{note.title}</h2>

            <p>{note.text}</p>

            <button
              className="edit-btn"
              onClick={() => Edit(index)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => Delete(index)}
            >
              Delete
            </button>

          </div>
        ))}

      </div>

      <div className="count">
        <p>Total Notes: {notes.length}</p>
      </div>

    </div>
  );
}

export default App;

