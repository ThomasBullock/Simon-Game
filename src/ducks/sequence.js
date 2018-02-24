export const CREATE_SEQUENCE = 'CREATE_SEQUENCE';
export const GET_SEQUENCE_ITEM = 'GET_SEQUENCE_ITEM';


// Action Creators

export const createSequence = function(sequence) { 
	return {
		type: CREATE_SEQUENCE, sequence
	} 
};

export const getSequenceItem = (index) => { type: GET_SEQUENCE_ITEM, index };

const initialState = [];

// Reducers

const sequence = (state = initialState, action ) => {
	switch (action.type) {
		case CREATE_SEQUENCE:
			return action.sequence;
		default: 
			return state;
	}
}

export default sequence;
