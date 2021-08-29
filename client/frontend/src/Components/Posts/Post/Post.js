import React from 'react'
import {Typography,Card,CardMedia,Button,CardActions,CardContent} from '@material-ui/core'
import useStyles from './styles'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import {deletePost,likePost} from '../../../actions/postsAction'

const Post = ({post,setCurrentId}) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const tagValues = post.tags[0].split(',');
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color:"white"}} size="small" onClick={()=>setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{tagValues.map((tag)=>`#${tag} `)}</Typography>
            </div>
            <Typography variant="h5" className={classes.title} gutterBottom>{post.title}</Typography>
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small"/>
                    Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color='secondary' onClick={()=>dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post
