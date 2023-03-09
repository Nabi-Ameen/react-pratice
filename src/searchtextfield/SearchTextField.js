import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const suggestions = [
  { label: "Apple" },
  { label: "Banana" },
  { label: "Cherry" },
  { label: "Durian" },
  { label: "Elderberry" },
  { label: "Fig" },
  { label: "Grape" },
  { label: "Honeydew" },
  { label: "Iceberg lettuce" },
  { label: "Jackfruit" },
];

const SearchTextField = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

  const filteredOptions = suggestions.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <>
      <Autocomplete
        options={filteredOptions}
        getOptionLabel={(option) => option.label}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField {...params} label="Enter text" variant="outlined" />
        )}
        open={inputValue.length >= 2}
      />
    </>
  );
};

export default SearchTextField;
