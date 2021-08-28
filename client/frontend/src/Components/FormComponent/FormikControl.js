/** @format */

import React from "react";
import Input from "./Input";
import RadioButton from "./RadioButton";
import SelectOption from "./SelectOption";
import CheckboxButton from "./CheckboxButton";
import DatePicker from "./DatePicker";
import FileUpload from "./FileUpload";

const FormikControl = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;

    case "radio":
      return <RadioButton {...rest} />;

    case "select":
      return <SelectOption {...rest} />;

    case "checkbox":
      return <CheckboxButton {...rest} />;

    case "datepicker":
      return <DatePicker {...rest} />;

    case "fileUpload":
      return <FileUpload {...rest} />;

    default:
      return null;
  }
};

export default FormikControl;
