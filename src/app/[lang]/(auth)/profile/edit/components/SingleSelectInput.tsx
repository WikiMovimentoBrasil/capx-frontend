"use client";
import Select, { SingleValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SingleSelectInputProps {
  children: React.ReactNode;
  isUserSelectionLoaded?: boolean;
  id: string;
  data: Option[];
  defaultValue?: Option | null;
  onChange: (option: SingleValue<Option>) => void;
}

const selectStyle = {
  control: (base: any) => ({
    ...base,
    height: "48px",
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
  }),
};

export default function SingleSelectInput({
  children,
  isUserSelectionLoaded = true,
  id,
  data,
  defaultValue = null,
  onChange,
}: SingleSelectInputProps) {
  if (isUserSelectionLoaded) {
    return (
      <div className="w-full space-y-2 mb-8">
        <span className="ml-2">{children}</span>
        <Select<Option>
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
    );
  }
  return null;
}
