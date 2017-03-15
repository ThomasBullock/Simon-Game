import React, { Component } from 'react';
import '../css/App.css';
import {random} from '../helpers';
import {arraysEqual} from '../helpers';
import Button from './Button';
import Control from './Control';

class App extends Component {
  constructor(props) {
  	super();
  	this.onOff = this.onOff.bind(this);
    this.initializeGame = this.initializeGame.bind(this);
    this.playerGuess = this.playerGuess.bind(this);
    this.wrong = this.wrong.bind(this);
    this.checkSequence = this.checkSequence.bind(this);
    this.playSiSequence = this.playSiSequence.bind(this);    
    
  	this.state = {
  		count: 0,
      display: null,
      gameStarted: null,
      playerTurn: false,
      failed: false,
  		siSequence: null,
  		playSequence: null 
  	}
    
  }
  
  
  componentDidUpdate() {
    if(this.state.gameStarted === true && this.state.failed !== true && this.state.playerTurn !== false) {
      this.checkSequence();       
    }  
  }
  
  wrong(){
    if(this.state.failed === true) {
      return
    } else {
      this.setState({
        display: "!!",
        failed: true
      })
    }
  }
  
  onOff(e) {
    console.dir(e.target.checked);
    if(e.target.checked) {
      this.setState({
        display: this.state.count,
        gameStarted: false
      })
    } else {
      this.setState({
        count: 0,
        display: null,
        gameStarted: null,
        failed: false,        
        siSequence: null,
        playSequence: null         
      })      
    }
  }	
	
  initializeGame() {    
    const randomArray = [];
    
    for(var i = 0; i < 20; i++) {
      randomArray.push(random(4));
    }
    
    console.log(randomArray.length);
    
    this.setState({
      gameStarted: true,
      failed: false,        
      siSequence: randomArray,
      playSequence: []
    })
    setTimeout( () => { 
      this.playSiSequence(); 
    }, 2000);
    
  }
  
  
  
  // gameTurn() {
    
  // }
  
  // addCount() {
  //   this.setState({
  //     count: this.state.count + 1
  //   })
  // }
  
  activateColorButton(color, target) {
    console.log(target)
    target.classList.add(`on-${color}`);
    var audio = new Audio(`audio/${color}.wav`);
    audio.play();
    setTimeout( () => { 
        this.deactivateColorButton(color, target); 
    }, 1000);    
  }
  
  deactivateColorButton(color, target) {  //to be trigger 500ms after mouseup
    target.classList.remove(`on-${color}`);  
  }

  playSiSequence() {
    console.log(this.state.count);
    // for(let i = 0; i < this.state.count; i++) {
    //   console.log(this.state.siSequence);
    //   setTimeout(this.activateColorButton(this.state.siSequence[i], document.querySelector(`.${this.state.siSequence[i]}`)), 1500);
    // }
    var seq = this.state.siSequence.slice();
  
    // var i = 0, l = this.state.count;
    // (function iterator() {
    //     console.log(seq[i]);
    //     console.log(this);
    //     // this.activateColorButton(seq[i], document.querySelector(`.${this.state.siSequence[i]}`));

    //     if(++i<l) {
    //         setTimeout(iterator, 1500);
    //     }
    // }).bind(this)(seq);
    var count = this.state.count;
    
    (function(count, seq, self){
        var loop = 0;

        var looper = function(){
            console.log('Loop count: ' + loop);
            console.log(seq[loop]);
            self.activateColorButton(seq[loop], document.querySelector(`.${seq[loop]}`) );
            if (loop < count) {
                loop++;
            } else {
                self.setState({
                  count: self.state.count + 1,
                  playerTurn: true
                })
                console.log('Loop end.');
                
                return;
            }

            setTimeout(looper, 1500);
        };

        looper();
    })(count, seq, this);
          
  }
  
  playerGuess(color, target) {
    // if(this.state.playerTurn) {
      console.log('click')
      this.activateColorButton(color, target)
      
      var playerSequence = this.state.playSequence.slice();

      playerSequence.push(color);
      
      this.setState({
        playSequence: playerSequence
      })      
    // } else {
    //   return;
    // }

  }
  
  checkSequence() {
    const player = this.state.playSequence.slice();
    const computer = this.state.siSequence.slice(0, player.length);
    
    // console.log(arraysEqual(player, computer));
    if(arraysEqual(player, computer)){
      console.log('correct!')
      this.setState({
        playerTurn: false
      })
      // this.playSiSequence();
    } else {
      this.wrong();
    }

    
    // console.log(player);
    // console.log(computer); 
  }


  
  
  render() {
  
    return (
      <div className="App">
      	<div className="game-container">
	        <Button color="green" playerGuess={this.playerGuess} gameStarted={this.state.gameStarted}/>
	        <Button color="red" playerGuess={this.playerGuess} gameStarted={this.state.gameStarted}/>        
	        <Button color="yellow" playerGuess={this.playerGuess} gameStarted={this.state.gameStarted}/>
	        <Button color="blue" playerGuess={this.playerGuess} gameStarted={this.state.gameStarted}/>
	        <Control onOff={this.onOff} startGame={this.initializeGame} display={this.state.count}/>
	    </div>    
        
      </div>
    );
  }
}

export default App;
