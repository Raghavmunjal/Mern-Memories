/** @format */

import React from "react";
import useStyles from './styles'

const TextError = (props) => {
  const classes = useStyles()
  return <div className={classes.error}>{props.children}</div>;
};

export default TextError;
