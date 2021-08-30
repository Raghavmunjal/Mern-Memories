import mongoose from 'mongoose'

const postsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    message:{
        type: String,
    },
    name:{
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
    likes:{
        type: [String],
        default:[]
    },
    createdAt:{
        type: Date,
        default:new Date()
    }
})

const postsModel = mongoose.model('PostMessage',postsSchema)
export default postsModel
