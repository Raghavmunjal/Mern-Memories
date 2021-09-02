import React,{useState,useEffect} from 'react'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Avatar,Button,Paper,Grid,Typography,Container } from '@material-ui/core'
import useStyles from './styles'
import AuthInput from './AuthInput'
import  LockOutlinedIcon  from '@material-ui/icons/LockOutlined'
import {GoogleLogin} from 'react-google-login'
import Icon from './Icon'
import {useHistory,Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { AUTH } from '../../constants/AuthConstants';
import {signIn} from '../../actions/authAction'

const AuthLogin = () => {

    const classes = useStyles()

    const dispatch = useDispatch()

    const history = useHistory()

    const auth = useSelector((state) => state.auth)

    const { userInfo } = auth
    useEffect(() => {
        if (userInfo) {
        history.push('/posts')
        }
    }, [history, userInfo])
    
    const [showPassword,setShowPassword] = useState(false)

    const initialValues = {
        email:"",
        password:"",
    }
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Required"),
        password: Yup.string().required("Required").min(8, "Minimun 8 characters"),
    });

    const googleSuccess = async(res) =>{
        
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });
            history.push('/')
        } catch (error) {
            console.log(error);
        }

    }

    const googleFailure = () => {
        console.log("Google Sign In was Unsuccessful. Try Again Later");
    }


    const onSubmit = ( values ) =>{
        dispatch(signIn(values,history))
    }

    const handleShowPassword = () => {
        setShowPassword((prev)=>!prev)
    } 
    
    return (
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}>
        {(formik)=>(
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">
                    Sign In
                </Typography>
                <Form className={classes.form}>
                    <Grid container spacing={2}>
                        <AuthInput name="email" type="email" label="Email Address"  />
                        <AuthInput name="password" type={showPassword ? "text" : "password" } label="Password" handleShowPassword={handleShowPassword}  />
                    </Grid>
                    <Button type="submit"  variant="contained" fullWidth color="primary" className={classes.submit}>
                        Sign In
                    </Button>
                    
                    <GoogleLogin
                    clientId='832457556213-7nel0g00csh39otp500021tr8tfsafel.apps.googleusercontent.com'
                    render={(renderProps) => (
                    <Button
                        className={classes.googleButton}
                        size='large'
                        variant='contained'
                        color='primary'
                        fullWidth
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        startIcon={<Icon />}>
                        Google Sign In
                    </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                    />

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to='/auth/register' className={classes.link}>
                            <Button className={classes.switch} >
                                Don't have an account? Sign Up
                            </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Form>
            </Paper> 
        </Container>
        )}
        </Formik>
    )
}

export default AuthLogin
