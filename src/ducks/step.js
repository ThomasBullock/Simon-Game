export const INCREMENT_STEP = 'INCREMENT_STEP';
export const RESET_STEP = 'RESET_STEP';


// Action Creators

export const incrementStep = () => ( {type: INCREMENT_STEP } );
export const resetStep = () => ( {type: RESET_STEP } );


const initialState = -1;


// Reducer 
const step = (state = initialState, action) => {
	switch (action.type) {
		case INCREMENT_STEP:
			return state + 1;
		case RESET_STEP:
			return state = 0;
		default: 
			return state;
	}
}

export default step;