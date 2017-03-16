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
    this.toggleStrict = this.toggleStrict.bind(this);
    this.checkSequence = this.checkSequence.bind(this);
    this.playSiSequence = this.playSiSequence.bind(this);    
    
  	this.state = {
  		count: null,
      gameStarted: null,
      playerTurn: false,
      win: false,
      strict: false,
      failed: false,
  		siSequence: null,
  		playSequence: null 
  	}    
  }

  
  componentDidUpdate(prevProps, prevState) {
    if(this.state.playerTurn === true) {
      if (this.state.playSequence.length !== prevState.playSequence.length) {
        console.log('yes we will check');
        this.checkSequence();  
      }          
    }  
    
    if(this.state.gameStarted === true && this.state.playerTurn === false) {
      setTimeout( () => { 
        this.playSiSequence(); 
      }, 1500);
    }          
    
    if(this.state.win === true) {
      setTimeout( () => { 
        this.playSiSequence(["green", "red", "blue", "yellow"], 4, 250);  
      }, 1500); 
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
    if(e.target.checked) {
      this.setState({
        count: 0,
        gameStarted: false
      })
    } else {
      this.setState({
        count: null,
        gameStarted: null,
        failed: false,        
        siSequence: null,
        playSequence: null         
      })      
    }
  }
  
  toggleStrict() {
    if(this.state.count === null) {
      return; 
    } else {
      this.setState({
        strict: !this.state.strict
      })
    }
  }	
	
  initializeGame() {    
    const randomArray = [];
    
    for(var i = 0; i < 20; i++) {
      randomArray.push(random(4));
    }
       
    this.setState({
      count: 1,
      gameStarted: true,
      failed: false,
      win: false,
      playerTurn: false,        
      siSequence: randomArray,
      playSequence: []
    })    
  }
  

  
  activateColorButton(color, target) {
    target.classList.add(`on-${color}`);
    var audio = new Audio(`audio/${color}.wav`);
    audio.play();
    setTimeout( () => { 
        this.deactivateColorButton(color, target); 
    }, 1000);    
  }
  
  deactivateColorButton(color, target) {  //to be trigger 1000ms after mouseup
    target.classList.remove(`on-${color}`);  
  }

  playSiSequence(arr, length, ms) {

    var seq = arr || this.state.siSequence.slice();    
    var count = length || this.state.count - 1;   
    var delay = ms || 1500;
    
    (function(count, seq, self){
        var loop = 0;

        var looper = function(){
            console.log('Loop count: ' + loop);
            console.log(seq[loop]);
            self.activateColorButton(seq[loop], document.querySelector(`.${seq[loop]}`) );
            if (loop < count) {
                loop++;
            } else if (!self.state.win) {
                self.setState({
                  playerTurn: true
                })
                console.log('Loop end.');               
                return;
            }
            setTimeout(looper, delay);
        };

        looper();
    })(count, seq, this, delay);
          
  }
  
  playerGuess(color, target) {
    if(this.state.playerTurn) {
      console.log('click')
      this.activateColorButton(color, target)
      
      var playerSequence = this.state.playSequence.slice();

      playerSequence.push(color);
      
      this.setState({
        playSequence: playerSequence
      }) 
    }     
  }
  
  checkSequence() {
    const player = this.state.playSequence.slice();
    const computer = this.state.siSequence.slice(0, player.length);
    console.log(player.length) 
    console.log(computer.length)    
    // console.log(arraysEqual(player, computer));
    if(arraysEqual(player, computer)){
      console.log('correct!')
      console.log('count: ' + this.state.count + "  play: " + this.state.playSequence.length )
      if(this.state.count === this.state.playSequence.length) {
        console.log('we set state')
        if(this.state.count === 20) {
          this.setState({
            gameStarted: false,
            win: true,
            playerTurn: false
          })
        }
        setTimeout( () => { 
          this.setState({                  
            count: this.state.count + 1,
            playerTurn: false,
            playSequence: []
          })          
        }, 1500);
      }
    } else {
      console.log('oh no wrong!');
      console.log(player);
      console.log(computer);      
      if (this.state.strict) {
        this.wrong();
      }  else {
        this.setState({
          playerTurn: false,
          playSequence: []
        })        
      }         

    }
  }
   
  render() {
  
    return (
      <div className="App">
      	<div className="game-container">
	        <Button color="green" playerGuess={this.playerGuess} gameStarted={this.state.gameStarted}/>
	        <Button color="red" playerGuess={this.playerGuess} gameStarted={this.state.gameStarted}/>        
	        <Button color="yellow" playerGuess={this.playerGuess} gameStarted={this.state.gameStarted}/>
	        <Button color="blue" playerGuess={this.playerGuess} gameStarted={this.state.gameStarted}/>
	        <Control 
            onOff={this.onOff} 
            startGame={this.initializeGame}
            strict={this.state.strict}
            toggleStrict={this.toggleStrict} 
            count={this.state.count}
            failed={this.state.failed}
            win={this.state.win}
          />
	    </div>    
        
      </div>
    );
  }
}

export default App;
