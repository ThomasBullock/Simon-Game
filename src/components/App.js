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
      strict: false,
      failed: false,
  		siSequence: null,
  		playSequence: null 
  	}
    
  }
  
  componentWillUpdate(nextProps, nextState) {

    
    // console.log(nextState);
    // console.log(this.state);
    // if(nextState.gameStarted === true && this.state.gameStarted === false) {
    //   setTimeout( () => { 
    //     this.playSiSequence(); 
    //   }, 2000);
    // }

    // if(this.state.playerTurn === true && (this.state.playSequence.length !== nextState.playSequence.length)) {
    //   console.log('yes we will check')
    //   this.checkSequence();  
    // }
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.playSequence);
    console.log(prevState.playSequence);
    if(this.state.playerTurn === true) {
      if (this.state.playSequence.length !== prevState.playSequence.length) {
        console.log('yes we will check');
        this.checkSequence();  
      }          
    }  
    
    // if(this.state.gameStarted === true && this.state.failed !== true && this.state.playerTurn !== false) {
    //   this.checkSequence();       
    // }
    if(this.state.gameStarted === true && this.state.playerTurn === false) {
      setTimeout( () => { 
        this.playSiSequence(); 
      }, 2000);
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
    
    // console.log(randomArray.length);
    
    this.setState({
      gameStarted: true,
      failed: false,        
      siSequence: randomArray,
      playSequence: []
    })    
  }
  
  
  
  // gameTurn() {
    
  // }
  
  // addCount() {
  //   this.setState({
  //     count: this.state.count + 1
  //   })
  // }
  
  activateColorButton(color, target) {
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

    var seq = this.state.siSequence.slice();
  

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
   console.log(player.length) 
   console.log(computer.length)    
    // console.log(arraysEqual(player, computer));
    if(arraysEqual(player, computer)){
      console.log('correct!')
      console.log('count: ' + this.state.count + "  play: " + this.state.playSequence.length )
      if(this.state.count === this.state.playSequence.length) {
        console.log('we set state')
        this.setState({
          playerTurn: false,
          playSequence: []
        })
      }

      // this.playSiSequence();
    } else {
      console.log('oh no wrong!');
      console.log(player);
      console.log(computer);      
                   
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
	        <Control 
            onOff={this.onOff} 
            startGame={this.initializeGame}
            strict={this.state.strict}
            toggleStrict={this.toggleStrict} 
            count={this.state.count}
            failed={this.state.failed}
          />
	    </div>    
        
      </div>
    );
  }
}

export default App;
