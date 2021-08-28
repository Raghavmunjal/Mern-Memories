import React from "react";
import { Field, ErrorMessage } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControl, FormLabel } from "@material-ui/core";
import TextError from "./TextError";

const CheckboxButton = (props) => {
  const { name, label, options, ...rest } = props;
  return (
    <Field name={name} id={name} {...rest}>
      {({ field }) => {
        return (
          <FormControl>
            <FormLabel className='label'>{label}</FormLabel>
            <div className='checkbox'>
              {options.map((option) => {
                return (
                  <React.Fragment key={option.key}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={name}
                          color='primary'
                          {...field}
                          key={option.value}
                          value={option.value}
                        />
                      }
                      label={option.key}
                    />
                  </React.Fragment>
                );
              })}
            </div>
            <ErrorMessage name={name} component={TextError} />
          </FormControl>
        );
      }}
    </Field>
  );
};

export default CheckboxButton;
