import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TextField } from '@mui/material'
const DynamicForm = () => {
    const [value, setValue] = useState(null)
    return (
        <div className='m-5'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    className='outline-none'
                    label="Departure Date"
                    value={value}
                    format="DD-MM-YYYY"
                    variant="standard"
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(props) => <TextField variant="standard" {...props} />}
                />
            </LocalizationProvider>
        </div>
    )
}

export default DynamicForm
