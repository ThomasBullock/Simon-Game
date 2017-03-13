import React from 'react';
import '../css/Count.css';


class Count extends React.Component {
	
	render() {
	console.log(this.props)	
		return (
			<div className="LCD">
				<span>03</span>
			</div>
		)
		
	}
}





export default Count;