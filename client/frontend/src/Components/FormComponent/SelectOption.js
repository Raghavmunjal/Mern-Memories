/** @format */

import React from "react";
import { ErrorMessage, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextError from "./TextError";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: "100%",
  },
}));

const SelectOption = (props) => {
  const { label, name, options, ...rest } = props;
  const classes = useStyles();

  return (
    <Field name={name} id={name} {...rest}>
      {({ field }) => {
        return (
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel>{label}</InputLabel>
            <Select id={name} {...field} label={label}>
              {options.map((option) => {
                return (
                  <MenuItem value={option.value} key={option.value}>
                    {option.value}
                  </MenuItem>
                );
              })}
            </Select>
            <ErrorMessage name={name} component={TextError} />
          </FormControl>
        );
      }}
    </Field>
  );
};

export default SelectOption;
