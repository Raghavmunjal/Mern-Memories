import * as api from '../api'
import {
    CREATE_POST,
    FETCH_ALL,
    DELETE_POST,
    UPDATE_POST,
    LIKE_POST,
    FETCH_BY_SEARCH,
    START_LOADING,
    END_LOADING,
    FETCH_POST_BY_ID,
    COMMENT_POST
} from '../constants/PostConstants'

//Action Creators -> that return action
export const getPosts = (page) => async(dispatch) => {
    try {
        dispatch({type:START_LOADING})
        const {data} = await api.fetchPosts(page);
        // const action = {type:'FETCH_ALL',payload:[]}
        // dispatch(action)
        dispatch({type:FETCH_ALL,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }

}

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({type:START_LOADING})
        const {data : {data}} = await api.fetchPostsBySearch(searchQuery);
        dispatch({type:FETCH_BY_SEARCH,payload:{data}})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }

}

export const getPostById = (id) => async(dispatch) => {
    try {
        dispatch({type:START_LOADING})
        const {data} = await api.fetchPostById(id);
        dispatch({type:FETCH_POST_BY_ID,payload:{post:data}})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }

}

export const createPost = (post,history) => async(dispatch) => {
    try {
        dispatch({type:START_LOADING})
        const {data} = await api.createPost(post);
        history.push(`/posts/${data._id}`)
        dispatch({type:CREATE_POST,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id,post) => async(dispatch) => {
    try {
        dispatch({type:START_LOADING})
        const {data} =await api.updatePost(id, post);
        dispatch({type:UPDATE_POST,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        dispatch({type:START_LOADING})
        await api.deletePost(id);
        dispatch({type:DELETE_POST,payload:id})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error.message)
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const {data} =await api.likePost(id);
        dispatch({type:LIKE_POST,payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = (value,id) => async(dispatch) => {
    try {
        const {data} = await api.comment(value,id)
        dispatch({type:COMMENT_POST,payload:data})
        return data.comments;
    }catch (error) {
        console.log(error)
    }
}