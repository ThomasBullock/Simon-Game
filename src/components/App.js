import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import '../css/App.css';
import {random} from '../helpers';
import {arraysEqual} from '../helpers';
import Button from './Button';
import Control from './Control';

import { incrementStep, resetStep } from '../ducks/step';
import { createSequence } from '../ducks/sequence';
import { powerOn, powerOff, startGame, endGame, startPlayerTurn, endPlayerTurn, toggleStrict, winGame, failGame } from '../ducks/status';

const actionCreators = {
  incrementStep,
  resetStep,
  createSequence,
  powerOn,
  powerOff,
  startGame,
  endGame,
  startPlayerTurn,
  endPlayerTurn,
  toggleStrict,
  winGame,
  failGame
}

console.log(actionCreators)

const sounds = {
  blue: new Audio('/audio/blue.mp3'),
  green: new Audio('/audio/green.mp3'),
  red: new Audio('/audio/red.mp3'),
  yellow: new Audio('/audio/yellow.mp3'),
};


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
    if(this.props.playerTurn === true) {
      if (this.state.playSequence.length !== prevState.playSequence.length) {
        // console.log('yes we will check');
        this.checkSequence();  
      }          
    }  
    
    if(this.props.gameStarted === true && this.props.playerTurn === false) {
      setTimeout( () => { 
        this.playSiSequence(); 
      }, 2000);
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
    for(const sample in sounds) {
        // console.log(sample)
        sounds[sample].volume = 0;
        sounds[sample].play();
    }
    
    if(e.target.checked) {
      this.props.powerOn();
      this.props.resetStep();
      this.setState({
        count: 0,
        gameStarted: false
      })
    } else {
      this.props.powerOff();
      this.props.endGame();      
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
    if(!this.props.power) {
      return; 
    } else {
      this.props.toggleStrict();
      this.setState({
        strict: !this.state.strict
      })
    }
  }	
	
  initializeGame() {    
    const randomArray = [];
    
    for(var i = 0; i < 5; i++) {
      randomArray.push(random(4));
    }
    
    // console.log('initializeGame') 
    this.props.createSequence(randomArray);
    this.props.startGame();
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
    sounds[color].currentTime = 0;
    sounds[color].volume = 1;
    sounds[color].play();
    setTimeout( () => { 
        this.deactivateColorButton(color, target); 
    }, 900);    
  }
  
  deactivateColorButton(color, target) {  //to be trigger 900ms after mouseup
    target.classList.remove(`on-${color}`);  
  }

  playSiSequence(arr, length, ms) {
    console.log(this.props.step)
    // console.log(this.props.sequence)    
    var seq = arr || this.props.sequence.slice();    
    var count = length - 1 || this.props.step;   
    var delay = ms || 1500;
    
    (function(count, seq, self, delay){ // this will loop through array (seq) activating button presses
        var loop = 0;
        console.log(count)
        var looper = function(){
            // console.log("I will activate " + seq[loop] + " on loop "  + loop);
            self.activateColorButton(seq[loop], document.querySelector(`.${seq[loop]}`) );
            if (loop < count) {
                loop++;
            } else { 
                if (!self.state.win) {
                  
                  self.props.startPlayerTurn();
                  
                  self.setState({
                    playerTurn: true
                  })
                  
                  
                }
                // console.log('Loop end.');               
                return;
            }
            setTimeout(looper, delay);
        };
        looper();
    })(count, seq, this, delay);
          
  }
  
  playerGuess(color, target) {
    if(this.props.playerTurn && !this.state.failed) {
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
    if(arraysEqual(player, computer)){
      // console.log('correct!')
      if(this.state.count === this.state.playSequence.length) {
        // console.log('we set state')
        if(this.state.count === 20) {
          this.setState({
            gameStarted: false,
            win: true,
            playerTurn: false
          })
        }
        setTimeout( () => {
          this.props.incrementStep();
          
          this.props.endPlayerTurn();
          
           
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
      if (this.props.strict) {
        this.props.failGame();
        // this.wrong();
      }  else {
        
        this.props.endPlayerTurn();
        
                  
        this.setState({
          playerTurn: false,
          playSequence: []
        })
        
                
      }         

    }
  }
   
  render() {
    // const count = (this.props.step > -1) ? this.props.step : null
    let count;
    // if status power = false count = null
    // else count = step
    // if gameStarted = true  count = step +1
    
    if(this.props.gameStarted) {
      count = this.props.step + 1;  
    } else {
      console.log('game hasnt started')
      if (this.props.power) {
        count = this.props.step
      } else {
        count = null
      }
    }
    
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
            strict={this.props.strict}
            toggleStrict={this.toggleStrict} 
            count={count}
            failed={this.state.failed}
            win={this.state.win}
          />
	    </div>    
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    step: state.step,
    sequence: state.sequence,
    power: state.status.power,
    gameStarted: state.status.gameStarted,
    playerTurn: state.status.playerTurn,
    strict: state.status.strict,
    gameWin: state.status.gameWin
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
