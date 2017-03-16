import React from 'react';
import '../css/Start.css';


class Start extends React.Component {
	
	render() {
		return (
			<div className="btn-space">
				<label>START</label>
				<input className="start-btn" type="button" onClick={this.props.startGame}/>							
			</div>
		)
		
	}
}


export default Start;