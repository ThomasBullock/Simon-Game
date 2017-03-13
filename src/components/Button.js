import React from 'react';
import '../css/Button.css';


class Button extends React.Component {
	
	render() {
	console.log(this.props)	
		return (
			<div className={`btn ${this.props.color}`}></div>
		)
		
	}
}





export default Button;