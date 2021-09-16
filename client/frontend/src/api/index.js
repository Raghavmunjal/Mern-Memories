import axios from 'axios';

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

const API = axios.create({baseUrl: "http://localhost:5000"})
//export const fetchPosts = ()=>axios.get('/posts')

// const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${userInfo.token}`,
//     },
//   }
//   const { data } = await axios.get(`/api/users/${id}`, config)

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPosts = (page)=>API.get(`/posts/?page=${page}`)

export const fetchPostById = (id)=>API.get(`/posts/${id}`)

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`);


export const createPost = (newPost) =>API.post('/posts',newPost,config)

export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost,config)

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const comment = (value,id) => API.post(`/posts/${id}/commentPost`,{value})

export const signIn = (values) => API.post('/user/signin',values,config) 

export const signUp = (values) => API.post('/user/signup',values,config) 