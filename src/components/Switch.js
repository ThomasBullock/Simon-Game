import React from 'react';
import '../css/Switch.css';

class Switch extends React.Component {
	
	render() {
		return (
			<div>
				<label className="label-switch">POWER
				  <input type="checkbox" onClick={(e) => this.props.onOff(e)}/>
				  <div className="checkbox"></div>
				</label>
			</div>				
		)
		
	}
}

export default Switch;

