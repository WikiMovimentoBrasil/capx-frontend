import AsyncSelect from 'react-select/async';

export default function CommonsSelect({ children, darkmode, id, data, onChange, placeholder, maxLength, key, loadOptions, formatOptionLabel }) {
  return (
    <div className="w-full space-y-2 mb-8">
      <span className="w-full ml-2">{children}</span>
      <AsyncSelect
        rows="4"
        placeholder={placeholder}
        className="w-full text-capx-dark-bg p-1 border-2 rounded-md resize-none"
        id={id}
        name={id}
        value={data}
        onChange={onChange}
        maxLength={maxLength}
        key={key}
        //Remove borders and padding
        styles={{
          control: (provided, state) => ({
            ...provided,
            border: 'none',
            padding: '0px',
            boxShadow: 'none',
            color: "#757575",
          }),
          placeholder: (provided, state) => ({
              ...provided,
              color: "#757575",
          }),
          option: (provided, state) => ({
              ...provided,
              color: "#757575",
          })
        }}   
        cacheOptions={true}
        loadOptions={loadOptions}
        formatOptionLabel={formatOptionLabel}
      >
      </AsyncSelect>
    </div>
  )
}