import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
//import rootReducer from './reducers'
import censusReducer from './reducers'

//const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    censusReducer,
    preloadedState,
    //compose(applyMiddleware(thunkMiddleware,loggerMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )
    compose(applyMiddleware(thunkMiddleware) )
    
    
  )
}