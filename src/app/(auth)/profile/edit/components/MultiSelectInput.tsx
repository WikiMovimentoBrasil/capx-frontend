"use client";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectInputProps {
  children: React.ReactNode;
  isUserSelectionLoaded?: boolean;
  id: string;
  data: Option[];
  defaultValue?: Option[] | null;
  selectedOptions: Option[];
  onChange: (selectedOptions: Option[]) => void;
  placeholder: string;
}

const animatedComponents = makeAnimated();
const multiSelectStyle = {
  control: (base: any, state: any) => ({
    ...base,
    paddingLeft: "4px",
    color: "rgb(30 41 59)",
    border: 0,
    boxShadow: 0,
    "&:hover": {
      border: 0,
    },
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#757575",
  }),
};

export default function MultiSelectInput({
  children,
  isUserSelectionLoaded = true,
  id,
  data,
  defaultValue = null,
  selectedOptions,
  onChange,
  placeholder,
}: MultiSelectInputProps) {
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
          options={data}
          value={selectedOptions}
          onChange={onChange}
          noOptionsMessage={() => "No more options to select."}
          components={animatedComponents}
          className="text-capx-dark-bg border-2 rounded-md"
        />
      </div>
    );
  }
}
