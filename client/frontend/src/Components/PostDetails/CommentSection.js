import React,{useState,useRef} from 'react'
import { Typography,TextField,Button } from '@material-ui/core'
import {useDispatch,useSelector} from 'react-redux'
import useStyles from './styles'
import {commentPost} from '../../actions/postsAction'


const CommentSection = ({post}) => {
    const classes = useStyles()
    const dispatch = useDispatch() 
    const [comments,setComments] = useState(post?.comments)
    const auth = useSelector((state) => state.auth)

    const { userInfo } = auth

    const commentsRef = useRef()
    
    const [comment,setComment] = useState('')
    const handleClick = async() =>{
        const finalComment = `${userInfo.result.name} : ${comment}`
        const  newComments = await dispatch(commentPost(finalComment,post._id))
        setComments(newComments)
        setComment('')
        commentsRef.current.scrollIntoView({behavior:'smooth'})
    }
    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {
                        comments.map((comment,indx) =>(
                            <Typography key={indx} gutterBottom variant="subtitle1" >
                                <strong>{comment.split(': ')[0]}</strong>
                                {comment.split(':')[1]}
                            </Typography>
                        ))
                    }
                    <div ref={commentsRef}/>
                </div>
                {userInfo?.result?.name ?
                <div style={{width:"70%"}}>
                <Typography gutterBottom variant="h6">Write a Comment</Typography>
                <TextField 
                fullWidth
                rows={4}
                variant="outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                />
                <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>
                    Comment
                </Button>
                </div> : null
                }
            </div>
        </div>
    )
}

export default CommentSection
