import React, { Component } from "react";
import Logos from "./components/logos/logos";
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
    this.db = firebase.firestore();
    this.state = {
      cards: [],
      editing: 0,
      current_card: {},
      theme: true,
    };
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleFirebaseNoteEdit = this.handleFirebaseNoteEdit.bind(this);
    this.switchTheme = this.switchTheme.bind(this);

    // this.getFirestoreCards = this.getFirestoreCards.bind(this);
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
          this.cards.push({
            title: data.title,
            text: data.text,
            id: note.id,
          });
        });
        this.setState({ cards: this.cards.reverse() });
      });
  }
  getNightModeState() {
    this.db
      .collection("state")
      .doc("nightmode")
      .get()
      .then((querySnapshot) => {
        this.setState({ theme: querySnapshot.data().on });
        if (this.state.theme === true) {
          document.body.style.backgroundColor = "#202124";
        }
        if (this.state.theme === false) {
          document.body.style.backgroundColor = "#f0f0f0";
        }
      });
  }
  handleFirebaseNoteCreation(title, text) {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp();
    this.db
      .collection("notes")
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
  handleFirebaseNoteEdit(title, text, id, e) {
    this.db
      .collection("notes")
      .doc(id)
      .update({
        title: title,
        text: text,
      })
      .then(function () {
        console.log("Document updated");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    this.getFirestoreCards();
    this.setState({ editing: 0, current_card: {} });
    e.preventDefault();
  }
  handleFirebaseNoteDelete(id, e) {
    this.db
      .collection("notes")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document deleted");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    this.getFirestoreCards();
    this.setState({ editing: 0, current_card: {} });
    e.preventDefault();
  }
  handleCardClick(title, text, id) {
    this.setState({
      editing: 1,
      current_card: { title: title, text: text, id: id },
    });
  }
  switchTheme() {
    let theme = this.state.theme;
    this.setState({ theme: !theme });
    if (!theme === true) {
      document.body.style.backgroundColor = "#202124";
    } else {
      document.body.style.backgroundColor = "#f0f0f0";
    }

    this.db
      .collection("state")
      .doc("nightmode")
      .update({
        on: !theme,
      })
      .then(function () {
        console.log("Document updated");
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
  }
  componentWillMount() {
    console.log("yoo");
    this.getFirestoreCards();
    this.getNightModeState();
  }
  render() {
    return (
      <div className={"App " + (this.state.theme === true ? "night" : "day")}>
        <h1>IT WORKS</h1>
        <Settings switchTheme={this.switchTheme} checked={this.state.theme} />
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
                id={item.id}
                key={index}
                cardClicked={() =>
                  this.handleCardClick(item.title, item.text, item.id)
                }
              />
            );
          })}
        </Cards>
        {this.state.editing ? (
          <Modal
            title={this.state.current_card.title}
            text={this.state.current_card.text}
            id={this.state.current_card.id}
            editNote={(title, text, id, e) =>
              this.handleFirebaseNoteEdit(title, text, id, e)
            }
            deleteNote={(id, e) => this.handleFirebaseNoteDelete(id, e)}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
