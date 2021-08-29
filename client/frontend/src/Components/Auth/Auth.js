import React,{useState} from 'react'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Avatar,Button,Paper,Grid,Typography,Container } from '@material-ui/core'
import useStyles from './styles'
import AuthInput from './AuthInput'
import  LockOutlinedIcon  from '@material-ui/icons/LockOutlined'
import {GoogleLogin} from 'react-google-login'
import Icon from './Icon'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { LOGIN } from '../../constants/AuthConstants';

const Auth = () => {

    const classes = useStyles()

    const dispatch = useDispatch()

    const history = useHistory()

    const [isSignUp,setIsSignUp] = useState(false)
    const [showPassword,setShowPassword] = useState(false)

    const initialValues = {
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    }
    const validationSchema = Yup.object({
        firstName: Yup.string().required("Required !"),
        lastName: Yup.string().required("Required !"),
        email: Yup.string().email("Invalid email format").required("Required"),
        password: Yup.string().required("Required").min(8, "Minimun 8 characters"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), ""], "Confirm Password Must Match Password")
            .required("Required"),
    });

    const googleSuccess = async(res) =>{
        
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: LOGIN, data: { result, token } });
            history.push('/')
        } catch (error) {
            console.log(error);
        }

    }

    const googleFailure = () => {
        console.log("Google Sign In was Unsuccessful. Try Again Later");
    }

    const switchMode = () => {
        setIsSignUp((prev)=>!prev)
        handleShowPassword(false)
    }

    const onSubmit = ( values ) =>{}

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
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <Form className={classes.form}>
                    <Grid container spacing={2}>
                        {isSignUp ?  (
                            <>
                            <AuthInput name="firstName" type="text" label="First Name" autoFocus half />
                            <AuthInput name="lastName" type="text" label="Last Name"  half />
                            </>
                        ) : null}
                        <AuthInput name="email" type="email" label="Email Address"  />
                        <AuthInput name="password" type={showPassword ? "text" : "password" } label="Password" handleShowPassword={handleShowPassword}  />
                        { isSignUp && <AuthInput name="confirmPassword" type={showPassword ? "text" : "password" } label="Confirm Password" handleShowPassword={handleShowPassword}  />}
                    </Grid>
                    <Button type="submit"  variant="contained" fullWidth color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' : "Sign In" }
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
                            <Button className={classes.switch} onClick={switchMode}>
                            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Paper> 
        </Container>
        )}
        </Formik>
    )
}

export default Auth
