import mongoose from 'mongoose'
import postsModel from '../models/postsModel.js'

export const getPosts = async(req,res) =>{
    const { page } = req.query
    try{

        const LIMIT = 8;
        const startIndex = (Number(page)-1)*LIMIT
        const total = await postsModel.countDocuments({})

        // newest to oldest -> sort
        const posts = await postsModel.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)
        res.status(200).json({data: posts,currentPage:Number(page),numberOfPages:Math.ceil(total / LIMIT)})

    }catch(err){
        res.status(404).json({message:err.message})
    }
} 


export const getPostById = async(req,res) =>{
    const { id } = req.params
    try{

        const post = await postsModel.findById(id)
        res.status(200).json(post)

    }catch(err){
        res.status(404).json({message:err.message})
    }
} 


export const getPostsBySearch = async(req,res) =>{

    const { searchQuery, tags} = req.query 

    try{
        // i -> case insensitive search query
        const title = new RegExp(searchQuery,'i')
        const posts = await postsModel.find({ $or:[{title},{tags:{$in : tags.split(',')}}]})
        res.json({data:posts})
    }catch(err){
        console.log(err)
        res.status(404).json({message:err})
    }
} 

export const createPost = async(req,res)=>{
    const post = req.body;
    const newPost = new postsModel({...post,creator:req.userId,createdAt:new Date().toISOString()})
    try{
        await newPost.save()
        res.status(201).json(newPost)
    }catch(err){
        res.status(409).json({message:err.message})
    }
}

export const updatePost = async(req,res)=>{
    const {id} = req.params;

    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with that id")

    const updatedPost = await postsModel.findByIdAndUpdate(id,{...post,id},{new:true})
    res.json(updatedPost)
}

export const deletePost = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with that id")

    await postsModel.findByIdAndRemove(id)

    res.json({message:"Post deleted Successfully"})
    
}

export const likePost = async(req,res)=>{

    if(!req.userId){
        res.json({message:'UnAuthenticated'})
    }

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with that id")

    const post = await postsModel.findById(id)

    const index = post.likes.findIndex((id)=> id === String(req.userId));

    if(index === -1){
        // like the post
        post.likes.push(req.userId)
    }else{
        // dislike the post
        post.likes = post.likes.filter((id)=> id !== String(req.userId))
    }

    const updatedPost = await postsModel.findByIdAndUpdate(id,post,{new:true})

    res.json(updatedPost)
}

export const commentPost = async(req,res)=>{
    const {id} = req.params;
    const {value} = req.body

    const post = await postsModel.findById(id)
    post.comments.push(value);
    const updatedPost = await postsModel.findByIdAndUpdate(id,post,{new:true})
    res.json(updatedPost)
}