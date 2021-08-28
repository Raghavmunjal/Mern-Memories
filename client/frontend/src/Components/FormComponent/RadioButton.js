/** @format */

import React from "react";
import { Field, ErrorMessage } from "formik";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
} from "@material-ui/core";
import TextError from "./TextError";

const RadioButton = (props) => {
  const { name, label, options, ...rest } = props;

  return (
    <Field name={name} id={name} {...rest}>
      {({ field }) => {
        return (
          <>
            <FormControl>
              <FormLabel className='radio'>{label}</FormLabel>
              <RadioGroup name={name} {...field} row>
                {options.map((option) => {
                  return (
                    <React.Fragment key={option.key}>
                      <FormControlLabel
                        value={option.value}
                        control={<Radio />}
                        label={option.key}
                        className='options'
                      />
                    </React.Fragment>
                  );
                })}
              </RadioGroup>
              <ErrorMessage name={name} component={TextError} />
            </FormControl>
          </>
        );
      }}
    </Field>
  );
};

export default RadioButton;
