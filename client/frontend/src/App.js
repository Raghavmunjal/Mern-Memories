import React,{useEffect} from 'react'
import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core'
import memories from './images/memories-1.png'
import Posts from './Components/Posts/Posts'
import FormComponent from './Components/FormComponent/FormComponent'
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import {getPosts} from './actions/postsAction'


const App = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPosts())
    },[])

    return (
        
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img src={memories} className={classes.image} alt="memories" height="80"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormComponent/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
        
    )
}

export default App
