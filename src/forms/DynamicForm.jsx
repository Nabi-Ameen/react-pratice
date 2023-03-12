import React, { useState } from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { TextField } from '@mui/material'
const DynamicForm = () => {
    // const [value, setValue] = useState(null)

    const schema = Yup.object().shape({
        friends: Yup.array()
            .of(
                Yup.object().shape({
                    age: Yup.string().required('Required')
                })
            )
    });
    return (
        <div className='m-5'>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    className='outline-none'
                    label="Departure Date"
                    value={value}
                    format="DD-MM-YYYY"
                    variant="standard"
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(props) => <TextField variant="standard" {...props} />}
                />
            </LocalizationProvider> */}
            <h1>Friend List</h1>
            <Formik
                initialValues={{
                    friends: [{ age: "" }]
                }}
                validationSchema={schema}
                onSubmit={values =>
                    console.log(values)
                }
                render={({ values }) => (
                    <Form>
                        <FieldArray
                            name="friends"
                            render={arrayHelpers => (
                                <div>
                                    {values.friends.map((friend, index) => (
                                        <div key={index}>
                                            <Field name={`friends.${index}.age`} />
                                            <ErrorMessage component="div" className='text-danger' name={`friends.${index}.age`} />
                                            <button type="button" onClick={() => arrayHelpers.remove(index)}>
                                                -
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.push({ age: '' })}
                                    >
                                        +
                                    </button>
                                    <div>
                                        <button type="submit">Submit</button>
                                    </div>
                                </div>
                            )}
                        />
                    </Form>
                )}
            />
        </div>
    )
}

export default DynamicForm
