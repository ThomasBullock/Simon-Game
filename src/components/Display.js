import React from 'react';
import '../css/Display.css';


class Display extends React.Component {
	constructor() {
		super()
		
		this.checkDisplay = this.checkDisplay.bind(this);	
	}
	
	checkDisplay() {
		if(this.props.failed) {
			return "!!";
		} else {
			return this.padDigit(this.props.count);
		}
	}
	
	
	
	
	padDigit(num) {
		if(num !== null && num <10 && num !== "!!") {
			return "0"+num;
		} else {
			return num
		}
		
	}
	
	render() {
		const display = this.checkDisplay();
		
		return (
			<div className="LCD">
				<span>{display}</span>
			</div>
		)
		
	}
}





export default Display;