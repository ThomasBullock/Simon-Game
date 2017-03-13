import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import Button from './Button';
import Control from './Control';

class App extends Component {
  constructor() {
  	super();
  	
  	this.state = {
  		count: null,
  		siSequence: null,
  		playSequence: null 
  	}
  }	
	
  render() {
    return (
      <div className="App">
      	<div className="game-container">
	        <Button color="green"/>
	        <Button color="red"/>        
	        <Button color="yellow"/>
	        <Button color="blue"/>
	        <Control count={this.state.count}/>
	    </div>    
        
      </div>
    );
  }
}

export default App;
