import React from 'react';
import '../css/Button.css';


class Button extends React.Component {
	clickHandler(e) {
		if(this.props.gameStarted !== true) {
			return;
		} else {	
			this.props.playerGuess(this.props.color, e.target);
		}
	}
	
	
	
	render() {
		return (
			<div className={`btn ${this.props.color}`} onClick={(e) => this.clickHandler(e)}></div>
		)
		
	}
}


export default Button;