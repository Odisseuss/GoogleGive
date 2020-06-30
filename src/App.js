import React, { Component } from "react";
import Logos from "./components/logos/Logos";
import CreateNote from "./components/createNote/CreateNote";
import Settings from "./components/settings/Settings";
import Card from "./components/card/Card";
import Cards from "./components/cards/Cards";
import Modal from "./components/modal/modal";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "./App.css";
const firebaseConfig = {
    apiKey: "AIzaSyBhrS0WZnJfji_RGVegxVsaRkjSZTQe_DQ",
    authDomain: "give-a5ae5.firebaseapp.com",
    databaseURL: "https://give-a5ae5.firebaseio.com",
    projectId: "give-a5ae5",
    storageBucket: "give-a5ae5.appspot.com",
    messagingSenderId: "32413726057",
    appId: "1:32413726057:web:67baedcfa96b259d7279f8",
    measurementId: "G-X406CYR9HR",
};
firebase.initializeApp(firebaseConfig);
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { cards: [], editing: 0, current_card: {} };
        this.handleCardClick = this.handleCardClick.bind(this);
    }

    handleFirebaseNoteCreation(title, text) {
        let timestamp = firebase.firestore.FieldValue.serverTimestamp();
        this.db
            .collection("notes")
            .doc(timestamp)
            .add({
                title: title,
                text: text,
                date: timestamp,
            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
        this.getFirestoreCards();
    }
    handleFirebaseNoteEdit(title, text, timestamp, e) {
        this.db
            .collection("notes")
            .doc(timestamp)
            .update({
                title: title,
                text: text,
            })
            .then(function (docRef) {
                console.log("Document updated with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
        this.getFirestoreCards();
        e.preventDefault();
    }
    handleCardClick(title, text, timestamp) {
        this.setState({
            editing: 1,
            current_card: { title: title, text: text, timestamp: timestamp },
        });
    }
    getFirestoreCards() {
        this.cards = [];
        this.db
            .collection("notes")
            .orderBy("date")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((note) => {
                    let data = note.data();
                    this.cards.push({ title: data.title, text: data.text });
                });
                this.setState({ cards: this.cards.reverse() });
            });
    }
    componentWillMount() {
        this.db = firebase.firestore();
        console.log(this.db.collection("notes").get());
        this.getFirestoreCards();
    }
    render() {
        return (
            <div className="App">
                <Settings />
                <Logos />
                <CreateNote
                    createNote={(title, text) =>
                        this.handleFirebaseNoteCreation(title, text)
                    }
                />
                <Cards>
                    {this.state.cards.map((item, index) => {
                        return (
                            <Card
                                title={item.title}
                                text={item.text}
                                timestamp={item.timestamp}
                                key={index}
                                cardClicked={() =>
                                    this.handleCardClick(item.title, item.text)
                                }
                            />
                        );
                    })}
                </Cards>
                {this.state.editing ? (
                    <Modal
                        title={this.state.current_card.title}
                        text={this.state.current_card.text}
                        timestamp={this.state.current_card.timestamp}
                        editNote={(title, text, timestamp, e) =>
                            this.handleFirebaseNoteEdit(
                                title,
                                text,
                                timestamp,
                                e
                            )
                        }
                    />
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default App;
