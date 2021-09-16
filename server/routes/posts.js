import express from 'express'
import auth from '../middleware/authMiddleware.js'
import {getPostsBySearch,getPosts,getPostById,createPost,updatePost,deletePost,likePost,commentPost} from '../controllers/posts-controller.js'

const router = express.Router()

router.get('/search', getPostsBySearch);
router.get('/',getPosts)
router.get('/:id',getPostById)
router.post('/',auth,createPost)
router.post('/:id/commentPost',auth,commentPost)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)

export default router