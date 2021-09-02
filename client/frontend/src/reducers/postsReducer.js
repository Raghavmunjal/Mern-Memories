import {
    CREATE_POST,
    FETCH_ALL,
    DELETE_POST,
    UPDATE_POST,
    LIKE_POST,
    FETCH_BY_SEARCH,
    START_LOADING,
    END_LOADING,
    FETCH_POST_BY_ID
} from '../constants/PostConstants'

export const postsReducer = (state={isLoading:true,posts:[]},action) =>{

    switch (action.type) {

        case START_LOADING:
            return {...state , isLoading: true};
        case END_LOADING:
            return {...state , isLoading: false};
        case UPDATE_POST:
        case LIKE_POST:
            return {...state,posts:state.posts.map((post)=>post._id === action.payload._id ? action.payload : post)};
        case FETCH_ALL:
            return {
                ...state,
                posts:action.payload.data,
                currentPage:action.payload.currentPage,
                numberOfPages:action.payload.numberOfPages,
            }
        case FETCH_BY_SEARCH:
            return {...state, posts:action.payload}
        case FETCH_POST_BY_ID:
            return {...state, post:action.payload.post}
        case CREATE_POST:
            return {...state,posts:[...state.posts,action.payload]}
        case DELETE_POST:
            return {...state,posts:state.posts.filter((post)=> post._id !== action.payload) }  
        default:
            return state
    }

}