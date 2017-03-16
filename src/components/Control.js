import React from 'react';
import '../css/Control.css';
import Display from './Display.js';
import Switch from './Switch.js';
import Start from './Start.js';
import Strict from './Strict.js';


class Control extends React.Component {
	
	render() {
		
		return (
			<div className="control">

				<h1>Simon</h1>	

				<Display count={this.props.count} failed={this.props.failed}/>
					<div className="buttons-container">
						<Switch onOff={this.props.onOff}/>
						<Start startGame={this.props.startGame}/>
						<Strict toggleStrict={this.props.toggleStrict} strict={this.props.strict}/>
					</div>	
			</div>
		)
		
	}
}


export default Control;