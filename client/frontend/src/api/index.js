import axios from 'axios';

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const fetchPosts = ()=>axios.get('/posts')

export const createPost = (newPost) =>axios.post('/posts',newPost,config)