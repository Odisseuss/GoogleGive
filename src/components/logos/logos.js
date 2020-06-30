import React from "react";
import "./Logos.css";
const logos = () => {
    return (
        <div className="logos">
            <img
                alt="Firebase Icon"
                src="https://firebasestorage.googleapis.com/v0/b/give-a5ae5.appspot.com/o/firebase-logo.c24b6b9c.png?alt=media&token=91245c48-30b7-46a4-9261-760fd43e0fa1"
            ></img>
            <span className="material-icons add">add</span>
            <img
                alt="React Icon"
                src="https://firebasestorage.googleapis.com/v0/b/give-a5ae5.appspot.com/o/logo512.png?alt=media&token=77255dcb-a888-4f98-bb8c-7fd1e889935b"
            ></img>
            <div className="plus-icon">
                <span className="material-icons">horizontal_rule</span>
                <span className="material-icons">horizontal_rule</span>
            </div>
            <img
                alt="Google Keep Icon"
                src="https://firebasestorage.googleapis.com/v0/b/give-a5ae5.appspot.com/o/keep-logo.579de524.png?alt=media&token=a15b7006-2957-4a49-8f6d-a26e837dd157"
            ></img>
        </div>
    );
};

export default logos;
