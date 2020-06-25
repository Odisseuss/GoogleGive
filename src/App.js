import React, { Component } from 'react';
import Logos from './components/logos/Logos';
import CreateNote from './components/createNote/CreateNote';
import Settings from './components/settings/Settings';
import Card from './components/card/Card';
import Cards from './components/cards/Cards';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import './App.css';
const firebaseConfig = {
	apiKey: 'AIzaSyBhrS0WZnJfji_RGVegxVsaRkjSZTQe_DQ',
	authDomain: 'give-a5ae5.firebaseapp.com',
	databaseURL: 'https://give-a5ae5.firebaseio.com',
	projectId: 'give-a5ae5',
	storageBucket: 'give-a5ae5.appspot.com',
	messagingSenderId: '32413726057',
	appId: '1:32413726057:web:67baedcfa96b259d7279f8',
	measurementId: 'G-X406CYR9HR',
};
firebase.initializeApp(firebaseConfig);
class App extends Component {
	constructor(props) {
		super(props);
		this.state = { cards: [] };
	}

	handleFirebaseNoteCreation(title, text) {
		this.db
			.collection('notes')
			.add({
				title: title,
				text: text,
			})
			.then(function (docRef) {
				console.log('Document written with ID: ', docRef.id);
			})
			.catch(function (error) {
				console.error('Error adding document: ', error);
			});
		let cards = [...this.state.cards];
		cards.unshift({
			title: this.state.input_value,
			text: this.state.textarea_value,
		});
		this.setState({ cards: cards });
	}
	componentDidMount() {
		this.db = firebase.firestore();
		this.cards = [];
		this.db
			.collection('notes')
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((note) => {
					let data = note.data();
					this.cards.push({ title: data.title, text: data.text, id: note.id });
				});
				this.setState({ cards: this.cards.reverse() });
			});
	}
	render() {
		return (
			<div className='App'>
				<Settings />
				<Logos />
				<CreateNote
					createNote={(title, text) =>
						this.handleFirebaseNoteCreation(title, text)
					}
				/>
				<Cards>
					{this.state.cards.map((item) => {
						return <Card title={item.title} text={item.text} key={item.id} />;
					})}
				</Cards>
			</div>
		);
	}
}

export default App;
