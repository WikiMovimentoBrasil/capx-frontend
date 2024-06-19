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

export default function SingleSelectInput({ children, isUserSelectionLoaded = true, id, data, defaultValue, onChange }) {
  if (isUserSelectionLoaded) {
    return (
      <div className="w-full space-y-2 mb-8">
        <label className="ml-2">{children}</label>
        <Select
          name={id}
          instanceId={id}
          isSearchable={true}
          styles={selectStyle}
          placeholder={""}
          options={data}
          defaultValue={defaultValue}
          onChange={onChange}
          className="text-capx-dark-bg border-2 rounded-md"
        />
      </div>
    )
  }
}