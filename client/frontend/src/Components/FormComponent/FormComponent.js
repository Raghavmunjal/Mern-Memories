import React,{useEffect,useState} from 'react'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useStyles from './styles'
import {Paper,Typography,Button} from '@material-ui/core'
import FormikControl from './FormikControl'
import {useDispatch,useSelector} from 'react-redux'
import {createPost,updatePost} from '../../actions/postsAction'


const FormComponent = ({currentId,setCurrentId}) => {

    const post = useSelector((state) => currentId ? state.posts.find((p)=> p._id === currentId) : null);

    const [formValues,setFormValues] = useState(null)
    useEffect(()=>{
        if(post && currentId)
        {
            setFormValues(post)
        }
        
    },[post,currentId])
    const classes = useStyles()
    
    
    
    const dispatch = useDispatch();

    // const FILE_SIZE = 160 * 1024;
    // const SUPPORTED_FORMATS = [
    //     "image/jpg",
    //     "image/jpeg",
    //     "image/gif",
    //     "image/png",
    // ];

    const initialValues = {
        creator:"",
        title:"",
        message:"",
        tags:[],
        selectedFile:"",
    };

    const validationSchema = Yup.object({
        creator: Yup.string().required("Required !"),
        title: Yup.string().required("Required !"),
        message: Yup.string().required("Required !"),
        // selectedFile: Yup.mixed()
        // .required("A File is Required")
        // .test(
        //     "fileSize",
        //     "File too large",
        //     (value) => value && value.size <= FILE_SIZE,
        // )
        // .test(
        //     "fileFormat",
        //     "Unsupported Format",
        //     (value) => value && SUPPORTED_FORMATS.includes(value.type),
        // ),
    });



    const onSubmit = async (values,onSubmitProps) => {

        if(currentId){
            dispatch(updatePost(currentId,values))
            handleReset()
        }else{
            dispatch(createPost(values))
        }
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };

    const handleReset = () =>{
        setCurrentId(null)
        setFormValues(initialValues)
    }

    return (
        
        <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}>
            {(formik) => (
                <Paper className={classes.paper}>
                    <Form className={`${classes.root} ${classes.form}`}>
                        <Typography variant='h6'>{currentId?'Editing' :'Creating'} a memory</Typography>
                        <FormikControl
                            control='input'
                            name='creator'
                            label='Creator'
                            type='text'
                        />
                        <FormikControl
                            control='input'
                            name='title'
                            label='Title'
                            type='text'
                        />
                        <FormikControl
                            control='input'
                            name='message'
                            label='Message'
                            type='text'
                        />
                        <FormikControl
                            control='input'
                            name='tags'
                            label='Tags'
                            type='text'
                        />
                        <div className={classes.fileInput}>
                        <FormikControl name='selectedFile' type='file' control='fileUpload' />
                        </div>
                        <Button 
                        className={classes.buttonSubmit} 
                        variant="contained" 
                        color='primary' 
                        size="large" 
                        type="submit" 
                        fullWidth 
                        disabled={!formik.isValid || formik.isSubmitting}>
                        {currentId?'Update' :'Create'}
                        </Button>
                        {currentId?
                        <Button className={classes.buttonSubmit} variant="contained" color='secondary' size="large"  fullWidth onClick={handleReset}>Reset</Button>:null}
                    </Form>
                </Paper>
            )}
        </Formik>
    )
}

export default FormComponent
