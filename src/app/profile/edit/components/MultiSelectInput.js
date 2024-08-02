"use client";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const multiSelectStyle = {
  control: (base, state) => ({
    ...base,
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
    color: "#757575",
  }),
};

export default function MultiSelectInput({ children, isUserSelectionLoaded = true, id, options, selectedOptions, onChange , placeholder}) {
  if (isUserSelectionLoaded) {
    return (
      <div className="w-full space-y-2 mb-8">
        <span className="ml-2">{children}</span>
        <Select
          isMulti
          name={id}
          instanceId={id}
          isSearchable={true}
          styles={multiSelectStyle}
          placeholder={placeholder}
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