import mongoose from 'mongoose'

const postsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    message:{
        type: String,
    },
    creator:{
        type: String,
    },
    tags:{
        type: [String],
    },
    selectedFile:{
        type: String,
    },
    likeCount:{
        type: Number,
        default:0,
    },
    createdAt:{
        type: Date,
        default:new Date()
    }
})

const postsModel = mongoose.model('PostMessage',postsSchema)
export default postsModel
