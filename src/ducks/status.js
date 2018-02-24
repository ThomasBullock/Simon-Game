
export const POWER_ON = 'POWER_ON';
export const POWER_OFF = 'POWER_OFF';
export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';
export const START_PLAYER_TURN = 'START_PLAYER_TURN';
export const END_PLAYER_TURN = 'END_PLAYER_TURN';
export const TOGGLE_STRICT = 'TOGGLE_STRICT';
export const WIN_GAME = 'WIN_GAME';
export const FAIL_GAME = 'FAIL_GAME';

// Action Creators

export const powerOn = () => ({ type: POWER_ON });
export const powerOff = () => ({ type: POWER_OFF });
export const startGame = () => ({ type: START_GAME });
export const endGame = () => ({ type: END_GAME });
export const startPlayerTurn = () => ( { type: START_PLAYER_TURN });
export const endPlayerTurn = () => ( { type: END_PLAYER_TURN });
export const toggleStrict = () => ( { type: TOGGLE_STRICT } );
export const winGame = () => ( { type: WIN_GAME } );
export const failGame = () => ( { type: FAIL_GAME} );


const initialState = {
	power: false,
	gameStarted: false,
	playerTurn: false,
	strict: false,
	gameWin: null
}


// Reducers

const status = (state = initialState, action) => {
	switch (action.type) {
		case POWER_ON: 
			return Object.assign({}, state, {power: true})
		case POWER_OFF: 
			return Object.assign({}, state, {power: false, strict: false, gameStarted: false, playerTurn: false, gameWin: null}) 			 
		case START_GAME:
			return Object.assign({}, state, {gameStarted: true})
		case END_GAME: // perhaps combine with above into toggle?
			return Object.assign({}, state, {gameStarted: false})					
		case START_PLAYER_TURN: 
			return { ...state, playerTurn: true }
		case END_PLAYER_TURN: 
			return { ...state, playerTurn: false }
		case TOGGLE_STRICT: 
			return { ...state, strict: !state.strict}
		case WIN_GAME:
			return { ...state,
							gameWin: true
					   }
		case FAIL_GAME: 
			return { ...state,
							gameWin: false
						 } 			
		default:
			return state;
	}
}

export default status;

