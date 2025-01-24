import AsyncSelect from "react-select/async";

interface Option {
  value: string;
  label: string;
}

interface CommonsSelectProps {
  children: React.ReactNode;
  darkmode?: boolean;
  id: string;
  data: any; //TODO: fix this
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  maxLength?: number;
  key?: string;
  loadOptions: (inputValue: any) => void;
  formatOptionLabel: ({
    value,
    label,
    thumbnail,
  }: {
    value: any;
    label: any;
    thumbnail: any;
  }) => React.ReactNode;
}

export default function CommonsSelect({
  children,
  darkmode,
  id,
  data,
  onChange,
  placeholder,
  loadOptions,
  formatOptionLabel,
}: CommonsSelectProps) {
  return (
    <div className="w-full space-y-2 mb-8">
      <span className="w-full ml-2">{children}</span>
      <AsyncSelect
        placeholder={placeholder}
        className="w-full text-capx-dark-bg p-1 border-2 rounded-md resize-none"
        id={id}
        name={id}
        value={{ value: data, label: data } as Option}
        onChange={(newValue: Option | null) =>
          onChange({ target: { value: newValue?.value || "" } } as any)
        }
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
