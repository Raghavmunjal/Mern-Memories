/** @format */

import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextError from "./TextError";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: "100%",
  },
}));

const DatePicker = (props) => {
  const { name, label, ...rest } = props;
  const classes = useStyles();

  return (
    <Field name={name} label={label} {...rest}>
      {({ field }) => {
        return (
          <div>
            <TextField
              variant='outlined'
              id={name}
              label={label}
              type='date'
              className={classes.formControl}
              InputLabelProps={{
                shrink: true,
              }}
              {...field}
            />
            <ErrorMessage name={name} component={TextError} />
          </div>
        );
      }}
    </Field>
  );
};

export default DatePicker;
