import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { TextField } from "@mui/material";

const FieldArrayForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          friends: [""],
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
       >
        {({ values }) => {
          return (
            <Form>
              <FieldArray
                name="friends"
                render={(arrayHelpers) => (
                  <div>
                    {values.friends.map((friend, index) => (
                      <div key={index}>
                        {/** both these conventions do the same */}
                        <Field name={`friends[${index}].name`} />
                        <Field name={`friends.${index}.age`} />
                        <Field name={`friends.${index}.email`} />
                        <Field name={`friends.${index}.password`} />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          -
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          age: "",
                          email: "",
                          password: "",
                        })
                      }
                    >
                      +
                    </button>
                    <button type="submit">Submit</button>
                  </div>
                )}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FieldArrayForm;
