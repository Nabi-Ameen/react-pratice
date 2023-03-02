import { TextField } from "@mui/material";
import { useState } from "react";

const FormsPratice = () => {
  const firstObject = { firstName: "", lastName: "", number: "" };
  const [inputFields, setInputFields] = useState([firstObject]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    setInputFields([...inputFields, firstObject]);
  };

  return (
    <form>
      {inputFields.map((field, index) => {
        return (
          <div key={index} className="container mt-5">
            <div className="col-12 d-flex">
              <div className="col-sm-3">
                <TextField
                  id="standard-basic"
                  label="firstName"
                  variant="standard"
                  name="firstName"
                  value={field.firstName}
                  onChange={(event) => handleFormChange(index, event)}
                />
              </div>
              <div className="col-sm-3">
                <TextField
                  id="standard-basic"
                  label="LastName"
                  name="lastName"
                  variant="standard"
                  value={field.lastName}
                  onChange={(event) => handleFormChange(index, event)}
                />
              </div>
              <div className="col-sm-3">
                <TextField
                  id="standard-basic"
                  label="Number"
                  variant="standard"
                  name="number"
                  value={field.number}
                  onChange={(event) => handleFormChange(index, event)}
                />
              </div>
              <div className="col-sm-3 mt-3">
                <button
                  type="submit"
                  onClick={addFields}
                  className="bg-success px-4 text-white"
                >
                  +
                </button>
                <button className="bg-danger px-4 ms-3 text-white">-</button>
              </div>
            </div>
          </div>
        );
      })}
    </form>
  );
};

export default FormsPratice;
