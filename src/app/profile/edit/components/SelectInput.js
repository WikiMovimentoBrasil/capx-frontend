"use client";
import Select from "react-select";

export default function SelectInput({ id, data, defaultValue, onChange, children }) {
  return (
    <div className="w-full space-y-2 mb-8">
      <label className="ml-1">{children}</label>
      <Select
        name={id}
        isSearchable={true}
        placeholder={""}
        className="border-2 rounded-md"
        options={data}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  )
}