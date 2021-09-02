import { createStore, combineReducers, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import {postsReducer} from './reducers/postsReducer'
import {authReducer} from './reducers/authReducer'

const reducer = combineReducers({
    posts:postsReducer,
    auth:authReducer,
})

const userInfoFromStorage = localStorage.getItem('profile')
? JSON.parse(localStorage.getItem('profile'))
: null

const intialState = {
    auth: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    intialState,
    compose(applyMiddleware(...middleware))
)

export default store