"use client";
import Select from "react-select";

export default function MultiSelectInput({ children }) {
  return (
    <div className="w-full space-y-2 mb-8">
      <label className="ml-1">{children}</label>
      <Select
        isMulti
        isSearchable={true}
        placeholder={""}
        noOptionsMessage={() => "No more options to select."}
        className="border rounded-md"
      />
    </div>
  )
}