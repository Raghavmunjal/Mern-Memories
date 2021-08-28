import { createStore, combineReducers, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import {postsReducer} from './reducers/postsReducer'

const reducer = combineReducers({
    posts:postsReducer,
})

const intialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    intialState,
    compose(applyMiddleware(...middleware))
  )
  
  export default store