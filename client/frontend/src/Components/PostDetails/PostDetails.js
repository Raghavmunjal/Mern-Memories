import React,{useEffect} from 'react'
import {Paper,Divider,Typography,CircularProgress} from '@material-ui/core'
import {useDispatch,useSelector} from 'react-redux'
import moment from 'moment'
import {useHistory,useParams} from 'react-router-dom'
import useStyles from './styles'
import { getPostById , getPostsBySearch} from '../../actions/postsAction'
import CommentSection from './CommentSection'

const PostDetails = () => {

    const {posts,isLoading,post} = useSelector((state)=>state.posts)
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const {id} = useParams()

    useEffect(() => {
        dispatch(getPostById(id));
    },[dispatch,id])

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [dispatch,post]);


    if(!post) return null;



    if(isLoading){
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em"/>
        </Paper>
    }

    const recommendedPosts = posts.filter(({_id})=> _id !== post._id)
    
    const openPost = (_id) => {
        history.push(`/posts/${_id}`)
    }

    return (
        <div className={classes.card}>
            <div className={classes.section}>
                <Typography variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                <Typography variant="h6">Created by: {post.name}</Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <CommentSection post={post}/> 
                <Divider style={{ margin: '20px 0' }} />
            </div>
            <div className={classes.imageSection}>
                <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
            </div>
            {recommendedPosts.length && 
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider/>
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({title,message,name,likes,selectedFile,_id})=>(
                            <div style={{ margin: '20px' , cursor: 'pointer'}} onClick={() => openPost(_id)} key={_id}>
                                <Typography variant="h6" gutterBottom>
                                    {title}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    {name}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    {message}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {likes.length !== 0 ? likes.length : null}
                                </Typography>
                                <img src={selectedFile} alt="" width="200px"/>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default PostDetails
