import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

export const signIn = async(req,res) =>{
    const{email,password} = req.body;
    try {
        const existingUser = await userModel.findOne({email})
        if(!existingUser){
            res.status(404).json({message: "User doesn't exist"})
        }
        const isPasswordMatch = await bcrypt.compare(password,existingUser.password)

        if(!isPasswordMatch){
            res.status(400).json({message: "Invalid Credentials"})
        }

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'secret',{expiresIn:"1h"})
        res.status(200).json({result:existingUser,token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something Went Wrong!"})
    }
}

export const signUp = async(req,res) =>{
    const {firstName,lastName,email,password,confirmPassword} = req.body;

    try {

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            res.status(400).json({message: "User Already exist"})
        }
        if(password!==confirmPassword){
            res.status(400).json({message: "Passwords don't Match"})
        }

        const hashPassword = await bcrypt.hash(password,12)

        const result = await userModel.create({email,password:hashPassword,name:`${firstName} ${lastName}`})

        const token = jwt.sign({email:result.email,id:result._id},'secret',{expiresIn:"1h"})
        res.status(200).json({result,token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something Went Wrong!"})
    }
}