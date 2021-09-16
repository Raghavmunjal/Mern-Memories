import React,{useState} from 'react'
import {Typography,Card,CardMedia,Button,CardActions,CardContent,ButtonBase} from '@material-ui/core'
import useStyles from './styles'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import {deletePost,likePost} from '../../../actions/postsAction'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useHistory} from 'react-router-dom'

const Post = ({post,setCurrentId}) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const tagValues = post.tags[0].split(',');
    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedPost = post?.likes?.find((like) => like === userId);
    const [likes,setLikes] = useState(post?.likes)

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
        setLikes(post.likes.filter((id) => id !== userId));
        } else {
        setLikes([...post.likes, userId]);
        }
    };

    const openPost = () =>{
        history.push(`/posts/${post._id}`)
    }


    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
            ? (
                <><FavoriteIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
                <><FavoriteBorderIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><FavoriteBorderIcon fontSize="small" />&nbsp;Like</>;
    };


    return (
        <Card className={classes.card} raised elevation={6}>
            {/* <ButtonBase className={classes.cardAction} onClick={openPost}> */}
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
                    <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}
            <ButtonBase className={classes.cardAction} onClick={openPost}>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{tagValues.map((tag)=>`#${tag} `)}</Typography>
            </div>
            <Typography variant="h5" className={classes.title} gutterBottom>{post.title}</Typography>
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes/>
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) ? (
                    <Button
                    size='small'
                    color='secondary'
                    onClick={() => {
                    dispatch(deletePost(post._id));
                    }}>
                    <DeleteIcon fontSize='small' />
                    Delete
                    </Button>
                ):null}

            </CardActions>
        </Card>
    )
}

export default Post


{/* <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={selectedFile} title={title} />
      <div className={classes.overlay}>
        <Typography variant='h6'>{name}</Typography>
        <Typography variant='body2'>{moment(createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.result?.googleId === creator ||
          user?.result?._id === creator) && (
          <Button
            style={{ color: "white" }}
            size='small'
            onClick={() => setcurrentId(_id)}>
            <MoreHorizIcon fontSize='small' />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>
          {tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant='h6' gutterBottom>
        {title}
      </Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary'>
          {message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          disabled={!user}
          onClick={() => {
            dispatch(likePost(_id));
            console.log(_id);
          }}>
          <Likes />
        </Button>
        {(user?.result?.googleId === creator ||
          user?.result?._id === creator) && (
          <Button
            size='small'
            color='secondary'
            onClick={() => {
              dispatch(deletePost(_id));
            }}>
            <DeleteIcon fontSize='small' />
            {" Delete"}
          </Button>
        )}
      </CardActions>
    </Card> */}


