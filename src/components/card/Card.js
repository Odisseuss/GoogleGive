import React from 'react';
import './Card.css';

const card = (props) => {
	return (
		<div className='card' onClick={props.cardClicked}>
			<span className='material-icons'>create</span>
			<div>
				<h1>{props.title}</h1>
				<p>{props.text}</p>
			</div>
		</div>
	);
};

export default card;
