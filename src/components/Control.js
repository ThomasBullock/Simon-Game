import React from 'react';
import '../css/Control.css';
import Display from './Display.js';
import Switch from './Switch.js';
import Start from './Start.js';
import Strict from './Strict.js';
import label from '../img/label.png'

console.log(label);

class Control extends React.Component {
	
	render() {
		
		return (
			<div className="control">

				<h1>Simon</h1>	

				<Display display={this.props.display}/>
					<div className="buttons-container">
						<Switch onOff={this.props.onOff}/>
						<Start startGame={this.props.startGame}/>
						<Strict />
					</div>	
			</div>
		)
		
	}
}


export default Control;