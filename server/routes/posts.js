import express from 'express'
import auth from '../middleware/authMiddleware.js'
import {getPosts,createPost,updatePost,deletePost,likePost} from '../controllers/posts-controller.js'

const router = express.Router()

router.get('/',getPosts)
router.post('/',auth,createPost)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)
export default router