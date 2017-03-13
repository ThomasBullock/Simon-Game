import React from 'react';
import '../css/Strict.css';

class Strict extends React.Component {
	
	render() {
		return (
			<div>
				<label>Strict</label>
				<input className="strict-btn" type="button"/>							
			</div>
		)
		
	}
}

export default Strict;