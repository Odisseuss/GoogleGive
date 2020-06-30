import React, { useState } from "react";
import "./modal.css";
import "../createNote/CreateNote.css";
const Modal = (props) => {
    const [values, setValues] = useState({ title: "", text: "" });
    const handleInputChange = (e) => {
        setValues({ title: e.target.value });
    };
    const handleTextareaChange = (e) => {
        setValues({ text: e.target.value });
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
                    onSubmit={(e) =>
                        props.editNote(
                            values.title,
                            values.text,
                            props.timestamp,
                            e
                        )
                    }
                >
                    <input
                        id="modalTitle"
                        name="title"
                        placeholder="Title"
                        value={props.title}
                        onChange={handleInputChange}
                    />

                    <textarea
                        id="modalContent"
                        name="content"
                        className="textarea"
                        placeholder="Create a note..."
                        value={props.text}
                        onChange={handleTextareaChange}
                    ></textarea>
                    <footer className="modal-footer">
                        <button
                            type="button"
                            className="delete-btn material-icons"
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
