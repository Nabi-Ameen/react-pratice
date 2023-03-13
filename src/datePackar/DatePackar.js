import React from "react";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

const DatePackar = () => {
  return (
    <div>
      const [abc,setAbc] = usestate(new Date())
      <DatePicker
        className={`flex `}
        selected={cnicExpiry}
        onChange={(e: any) => {
          setAbc(e);
          const datee = `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`;
          setFieldValue("cnic_expiry", datee);
        }}
        placeholderText={"dd-MM-yyyy"}
        dateFormat={"dd-MM-yyyy"}
        minDate={new Date()}
        showYearDropdown
        // showMonthDropdown
        id="datepicker"
      />
    </div>
  );
};

export default DatePackar;
