import React, { useState } from "react";
import "./modal.css";
import "../createNote/CreateNote.css";
const Modal = (props) => {
    const [title, setTitle] = useState(props.title);
    const [text, setText] = useState(props.text);
    const handleInputChange = (e) => {
        setTitle(e.target.value);
    };
    const handleTextareaChange = (e) => {
        setText(e.target.value);
    };
    return (
        <div className="modal-backdrop">
            <div
                role="dialog"
                aria-labelledby="modalTitle"
                aria-describedby="modalContent"
                className="modal"
            >
                <form
                    className="card-edit-form"
                    onSubmit={(e) => props.editNote(title, text, props.id, e)}
                >
                    <input
                        id="modalTitle"
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={title || ""}
                        onChange={handleInputChange}
                    />

                    <textarea
                        id="modalContent"
                        name="content"
                        className="textarea"
                        placeholder="Create a note..."
                        value={text || ""}
                        onChange={handleTextareaChange}
                    ></textarea>
                    <footer className="modal-footer">
                        <button
                            type="button"
                            className="delete-btn material-icons"
                            onClick={(e) => props.deleteNote(props.id, e)}
                        >
                            delete
                        </button>
                        <button type="submit" className="submit-btn">
                            Done
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default Modal;
