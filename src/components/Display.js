import React from 'react';
import '../css/Display.css';


class Display extends React.Component {
	constructor() {
		super()
		
		this.checkDisplay = this.checkDisplay.bind(this);
		this.getDisplayClass = this.getDisplayClass.bind(this);	
	}
	
	getDisplayClass() {
		if(this.props.win) {
			return "LCD flash";			
		} else {
			return "LCD";
		}
	}
	
	checkDisplay() {
		if(this.props.failed) {
			return "!!";
		} else if (!this.props.count && typeof this.props.count === 'object') {
			return
		} else {
			return this.padDigit(this.props.count);
		}
	}		
	
	padDigit(num) {
	
			if (num < 10) {
				return "0"+num;
			} else {
				return num
			}			
	}
	
	render() {
		const display = this.checkDisplay();
		
		return (
			<div className={this.getDisplayClass()}>
				<span>{display}</span>
			</div>
		)
		
	}
}





export default Display;