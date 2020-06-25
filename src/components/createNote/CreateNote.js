import React from 'react';
import './CreateNote.css';

class CreateNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = { taking_note: 0, input_value: '', textarea_value: '' };
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}
	handleTextareaFocus = () => {
		this.setState({ taking_note: 1 });
	};
	handleBackdropClick = () => {
		this.setState({ taking_note: 0 });
	};

	handleFormSubmit = (e) => {
		this.props.createNote(this.state.input_value, this.state.textarea_value);
		this.setState({ input_value: '', textarea_value: '' });
		e.preventDefault();
	};
	handleInputChange = (e) => {
		this.setState({ input_value: e.target.value });
	};
	handleTextareaChange = (e) => {
		this.setState({ textarea_value: e.target.value });
	};
	render() {
		return (
			<div>
				{this.state.taking_note ? (
					<div className='backdrop' onClick={this.handleBackdropClick}></div>
				) : (
					''
				)}

				<form
					className='create-note-form'
					onSubmit={(e) => this.handleFormSubmit(e)}>
					{this.state.taking_note ? (
						<input
							name='title'
							placeholder='Title'
							value={this.state.input_value}
							onChange={this.handleInputChange}></input>
					) : (
						''
					)}

					<textarea
						onFocus={this.handleTextareaFocus}
						onChange={this.handleTextareaChange}
						value={this.state.textarea_value}
						required
						className='textarea'
						placeholder='Create a note...'></textarea>
					<button type='submit' className='note-submit-btn material-icons'>
						add
					</button>
				</form>
			</div>
		);
	}
}

export default CreateNote;
