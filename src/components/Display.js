import React from 'react';
import '../css/Display.css';


class Display extends React.Component {
	constructor(props) {
		super(props);
	}
	
	
	
	padDigit(num) {
		if(num !== null && num <10 && num !== "!!") {
			return "0"+num;
		} else {
			return num
		}
		
	}
	
	render() {
	console.log(this.props)	
		return (
			<div className="LCD">
				<span>{this.padDigit(this.props.display)}</span>
			</div>
		)
		
	}
}





export default Display;