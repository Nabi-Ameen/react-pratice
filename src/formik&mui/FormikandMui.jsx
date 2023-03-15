import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
const FormikandMui = () => {

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        city: Yup.string()
            .required("Required")
    });

    const options = [
        { value: 'karachi', label: 'karachi' },
        { value: 'multan', label: 'multan' },
        { value: 'Peshawar', label: 'Peshawar' },
        { value: 'lahore', label: 'lahore' },
        { value: 'faislabad', label: 'faislabad' },
    ];
    return (
        <div className='container my-3'>
            <Formik
                // enableReinitialize={true}/
                // validateOnBlur={false}
                initialValues={{
                    name: '',
                    email: '',
                    city: '',

                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ values, errors, handleChange }) => (
                    <Form>
                        <div className='col-12 d-flex'>
                            <div className='col-sm-3 px-2'>
                                <Field
                                    as={TextField}
                                    variant="standard"
                                    name="name"
                                    label="Name"
                                    error={errors.name}
                                    helperText={errors.name}
                                />
                            </div>
                            <div className='col-sm-3 px-2'>
                                <Field
                                    as={TextField}
                                    variant="standard"
                                    name="email"
                                    label="Email"
                                    error={errors.email}
                                    helperText={errors.email}
                                />
                            </div>
                            <div className='col-sm-3 px-2'>
                                {/* <InputLabel id="select-city-label">Select City</InputLabel> */}
                                <FormControl variant="standard" sx={{ width: 1 }}>
                                    <InputLabel id="select-city-label">Age</InputLabel>
                                    <Field
                                        as={Select}
                                        variant="standard"
                                        name="city"
                                        labelId="select-city-labell"
                                        id="select-city-label"
                                        label="Select City"
                                        // labelId="select-city-label"
                                        className="col-10"
                                        value={values.city}
                                        onChange={handleChange}
                                        error={errors.city}
                                        helperText={errors.city}
                                    >
                                        {options?.map((option) => {
                                            return (
                                                <MenuItem key={option.label} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            )
                                        })}
                                    </Field>
                                </FormControl>

                            </div>

                        </div>

                        <div className='col-12 mt-5'>
                            <div className='col-sm-2 mx-auto'>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>



        </div>
    )
}

export default FormikandMui
