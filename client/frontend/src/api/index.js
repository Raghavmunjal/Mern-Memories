import axios from 'axios';

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const fetchPosts = ()=>axios.get('/posts')

export const createPost = (newPost) =>axios.post('/posts',newPost,config)

export const updatePost = (id,updatedPost) => axios.patch(`/posts/${id}`,updatedPost,config)

export const deletePost = (id) => axios.delete(`/posts/${id}`);

export const likePost = (id) => axios.patch(`/posts/${id}/likePost`)