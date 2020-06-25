import React from 'react';
import './Settings.css';

const settings = () => {
	return (
		<div className='night-mode-switch'>
			<label className='switch'>
				<input type='checkbox' />
				<span className='slider'></span>
			</label>
			<span className='material-icons'>nights_stay</span>
		</div>
	);
};

export default settings;