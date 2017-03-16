import React from 'react';
import '../css/Strict.css';

class Strict extends React.Component {
	constructor() {
		super()
		
		this.checkStrictMode = this.checkStrictMode.bind(this);
	}
	checkStrictMode(){
		if(this.props.strict) {
			return "strict-LED-on";
		} else {
			return "strict-LED";
		}
	}
	
	
	render() {
		return (
			<div className="btn-space">
				<label>STRICT</label>
				<input className="strict-btn" type="button" onClick={this.props.toggleStrict}/>
				<div className={this.checkStrictMode()}></div>							
			</div>
		)
		
	}
}

export default Strict;