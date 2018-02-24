import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../ducks/index';

const enhancers = [];

// connect redux dev tools
if(process.env.NODE_ENV === 'development') {
	const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	
	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension())
	}
}

const composedEnhancers = compose(
	...enhancers
)

const store = createStore(
	rootReducer,
	composedEnhancers
	)


export default store;