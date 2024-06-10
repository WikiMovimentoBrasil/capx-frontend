"use client";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const multiSelectStyle = {
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

export default function MultiSelectInput({ children, isUserSelectionLoaded = true, id, options, selectedOptions, onChange }) {
  if (isUserSelectionLoaded) {
    return (
      <div className="w-full space-y-2 mb-8">
        <label className="ml-2">{children}</label>
        <Select
          isMulti
          name={id}
          instanceId={id}
          isSearchable={true}
          styles={multiSelectStyle}
          placeholder={""}
          options={options}
          value={selectedOptions}
          onChange={onChange}
          noOptionsMessage={() => "No more options to select."}
          components={animatedComponents}
          className="text-capx-dark-bg border-2 rounded-md"
        />
      </div>
    )
  }
}