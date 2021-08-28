
import postsModel from '../models/postsModel.js'

export const getPosts = async(req,res) =>{
    try{
        const postsMessages = await postsModel.find()
        res.status(200).json(postsMessages)
    }catch(err){
        res.status(404).json({message:err.message})
    }
} 

export const createPost = async(req,res)=>{
    const post = req.body;
    const newPost = new postsModel(post)
    try{
        await newPost.save()
        res.status(201).json(newPost)
    }catch(err){
        res.status(409).json({message:err.message})
    }
}