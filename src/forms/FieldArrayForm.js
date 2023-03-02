import React from "react";
import { useFormikContext, FieldArray } from "formik";
import { TextField } from "@mui/material";

const FieldArrayForm = () => {
  const { values } = useFormikContext();

  return (
    <FieldArray name="myArray">
      {({ remove, push }) => (
        <>
          {values.myArray.map((value, index) => (
            <div key={index}>
              <TextField
                name={`myArray[${index}].text1`}
                label="Text 1"
                value={value.text1}
                onChange={(e) => {
                  values.myArray[index].text1 = e.target.value;
                }}
              />
              <TextField
                name={`myArray[${index}].text2`}
                label="Text 2"
                value={value.text2}
                onChange={(e) => {
                  values.myArray[index].text2 = e.target.value;
                }}
              />
              <TextField
                name={`myArray[${index}].text3`}
                label="Text 3"
                value={value.text3}
                onChange={(e) => {
                  values.myArray[index].text3 = e.target.value;
                }}
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => push({ text1: "", text2: "", text3: "" })}
          >
            Add
          </button>
        </>
      )}
    </FieldArray>
  );
};

export default FieldArrayForm;
