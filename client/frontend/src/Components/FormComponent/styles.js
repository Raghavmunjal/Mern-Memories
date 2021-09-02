import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow:"0 5px 14px rgba(0, 0, 0, 0.2)",
  },
  
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '12px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  error:{
      marginTop: '3px',
      color:"red",
  },
}));