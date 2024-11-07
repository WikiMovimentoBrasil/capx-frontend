export default function TextInput({ children, id, data, placeholder, onChange, type = "text", maxLength = 10, readOnly = false, inputCustomClass}) {
  return (
    <div className="w-full space-y-2 mb-8">
      <label className="w-full ml-2" htmlFor={id}>{children}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={inputCustomClass ? inputCustomClass : "w-full h-12 text-capx-dark-bg pl-4 border-2 rounded-md"}
        id={id}
        name={id}
        value={data}
        onChange={onChange}
        maxLength={maxLength}
        readOnly={readOnly ? true : undefined}
      />
    </div >
  )
}