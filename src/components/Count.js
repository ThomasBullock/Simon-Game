import React from 'react';
import '../css/Count.css';


class Count extends React.Component {
	
	render() {
	console.log(this.props)	
		return (
			<div className="LCD">
				<span>{this.props.count}</span>
			</div>
		)
		
	}
}





export default Count;