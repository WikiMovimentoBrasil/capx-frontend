"use client";
import Select from "react-select";

export default function SelectInput({ children }) {
  return (
    <div className="w-full space-y-2 mb-8">
      <label className="ml-1">{children}</label>
      <Select
        isSearchable={true}
        placeholder={""}
        className="border rounded-md"
      />
    </div>
  )
}