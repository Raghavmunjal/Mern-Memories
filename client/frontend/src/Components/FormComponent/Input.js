/** @format */

import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextField } from "@material-ui/core";
import TextError from "./TextError";
import useStyles from './styles'

const Input = (props) => {
  const classes = useStyles()
  const { type, label, name, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <>
            <TextField
              type={type}
              variant='outlined'
              margin='normal'
              className={classes.input}
              fullWidth
              id={name}
              label={label}
              name={name}
              {...rest}
              {...field}
            />
            <ErrorMessage name={name} component={TextError} />
          </>
        );
      }}
    </Field>
  );
};

export default Input;
