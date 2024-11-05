import AsyncSelect from "react-select/async";

interface CommonsSelectProps {
  children: React.ReactNode;
  darkmode: boolean;
  id: string;
  data: any; //TODO: Define data type
  onChange: (value: any) => void;
  placeholder: string;
  maxLength: number;
  key: string;
  loadOptions: () => Promise<any[] | any>;
  formatOptionLabel: (option: any) => string;
}

export default function CommonsSelect({
  children,
  darkmode,
  id,
  data,
  onChange,
  placeholder,
  maxLength,
  key,
  loadOptions,
  formatOptionLabel,
}: CommonsSelectProps) {
  return (
    <div className="w-full space-y-2 mb-8">
      <span className="w-full ml-2">{children}</span>
      <AsyncSelect
        // rows="4" TODO: Add rows if necessary
        placeholder={placeholder}
        className="w-full text-capx-dark-bg p-1 border-2 rounded-md resize-none"
        id={id}
        name={id}
        value={data}
        onChange={onChange}
        // maxLength={maxLength} TODO: Add maxLength if necessary
        key={key}
        //Remove borders and padding
        styles={{
          control: (provided, state) => ({
            ...provided,
            border: "none",
            padding: "0px",
            boxShadow: "none",
            color: "#757575",
          }),
          placeholder: (provided, state) => ({
            ...provided,
            color: "#757575",
          }),
          option: (provided, state) => ({
            ...provided,
            color: "#757575",
          }),
        }}
        cacheOptions={true}
        loadOptions={loadOptions}
        formatOptionLabel={formatOptionLabel}
      ></AsyncSelect>
    </div>
  );
}
