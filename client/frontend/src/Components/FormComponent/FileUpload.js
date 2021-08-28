/** @format */

import React from "react";
import { Field, ErrorMessage } from "formik";
import FileBase from 'react-file-base64';
import TextError from "./TextError";
import useStyles from './styles'


const FileUpload = (props) => {
  const { name, type, ...rest } = props;
  const classes = useStyles();
  return (
    <Field name={name} id={name} {...rest} className={classes.fileInput}>
      {({ form }) => {
        return (
          <>
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64})=>form.setFieldValue(name, base64)}
          />
            <ErrorMessage name={name} component={TextError} />
          </>
        );
      }}
    </Field>
  );
};

export default FileUpload;
