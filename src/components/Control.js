import React from 'react';
import '../css/Control.css';
import Count from './Count.js';

class Control extends React.Component {
	
	render() {
		
		return (
			<div className="control">
				<Count count={this.props.count}/>
			</div>
		)
		
	}
}


export default Control;