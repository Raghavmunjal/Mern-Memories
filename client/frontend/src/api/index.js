import axios from 'axios';

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

const API = axios.create({baseUrl: "http://localhost:5000"})
//export const fetchPosts = ()=>axios.get('/posts')

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPosts = ()=>API.get('/posts')

export const createPost = (newPost) =>API.post('/posts',newPost,config)

export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost,config)

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)


export const signIn = (values) => API.post('/user/signin',values,config) 
export const signUp = (values) => API.post('/user/signup',values,config) 