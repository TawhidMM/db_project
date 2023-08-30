import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import d from 'react-datepicker'

function DateInput() {
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    inputFormat="dd/MMM/yyyy"
                    className="form-control"
                />
            </LocalizationProvider>
        </div>
    )
}

export default DateInput