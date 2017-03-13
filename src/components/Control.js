import React from 'react';
import '../css/Control.css';
import Count from './Count.js';
import Start from './Start.js';
import Strict from './Strict.js';

class Control extends React.Component {
	
	render() {
		
		return (
			<div className="control">
				<Count count={this.props.count}/>
					<div className="buttons-container">
						<Start />
						<Strict />
					</div>	
			</div>
		)
		
	}
}


export default Control;