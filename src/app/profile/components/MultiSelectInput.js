"use client";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const multiSelectInput = {
  control: (base, state) => ({
    ...base,
    height: '48px',
    paddingLeft: '4px',
    color: 'rgb(30 41 59)',
    border: state.isFocused ? 0 : 0,
    // This line disable the blue border
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      border: state.isFocused ? 0 : 0
    },
  }),
  placeholder: (styles) => ({
    ...styles,
  }),
};

export default function MultiSelectInput({ children }) {
  return (
    <div className="w-full space-y-2 mb-8">
      <label className="ml-1">{children}</label>
      <Select
        isMulti
        isSearchable={true}
        styles={multiSelectInput}
        placeholder={""}
        noOptionsMessage={() => "No more options to select."}
        components={animatedComponents}
        className="border rounded-md"
      />
    </div>
  )
}