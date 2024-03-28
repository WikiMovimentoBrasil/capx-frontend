"use client";
import Select from "react-select";

const selectStyle = {
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

export default function SelectInput({ children }) {
  return (
    <div className="w-full space-y-2 mb-8">
      <label className="ml-1">{children}</label>
      <Select
        isSearchable={true}
        styles={selectStyle}
        placeholder={""}
        className="border rounded-md"
      />
    </div>
  )
}