import { combineReducers } from 'redux';
import step from './step';
import status from './status';
import sequence from './sequence';



const rootReducer = combineReducers({
	step,
	sequence,
	status
})

export default rootReducer;