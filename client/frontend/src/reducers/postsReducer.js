import {
    CREATE_POST,
    FETCH_ALL,
    DELETE_POST,
    UPDATE_POST,
    LIKE_POST,
} from '../constants/PostConstants'

export const postsReducer = (posts=[],action) =>{

    switch (action.type) {
        case UPDATE_POST:
        case LIKE_POST:
            return posts.map((post)=>post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return action.payload
        case CREATE_POST:
            return [...posts,action.payload] 
        case DELETE_POST:
            return posts.filter((post)=> post._id !== action.payload)   
        default:
            return posts
    }

}