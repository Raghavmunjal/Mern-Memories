import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import img from "../images/OnlineLearning.png";

const useStyles = makeStyles({
  root: {
    width: 350,
    height: 400,
  },

  aligning: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10%",
  },

  alignButton: {
    display: "flex",
    marginLeft: "35%",
    marginTop: "8%",
  },
});

const CardComponent = ({email}) => {
  const classes = useStyles();

  return (
    <div className={classes.aligning}>
      <Card className={classes.root} variant='outlined'>
        <CardActionArea>
          <CardMedia
            component='img'
            alt='Contemplative Reptile'
            height='270'
            image={img}
            title='Course Enrollment'
          />
        </CardActionArea>
        <CardActions>
          <Button
            variant='outlined'
            color='primary'
            size='large'
            className={classes.alignButton}>
            Enroll
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardComponent;
