export default function TextInput({ children, id, data, placeholder, onChange, type = "text", maxLength = 10 }) {
  return (
    <div className="w-full space-y-2 mb-8">
      <label className="w-full ml-2" for={id}>{children}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-12 text-capx-dark-bg pl-4 border-2 rounded-md"
        id={id}
        name={id}
        value={data}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div >
  )
}