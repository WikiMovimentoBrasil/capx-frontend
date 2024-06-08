export default function TextArea({ children, id, data, placeholder, onChange, type = "text", maxLength = 10 }) {
  return (
    <div className="w-full space-y-2 mb-8">
      <label className="w-full ml-2">{children}</label>
      <textarea
        type={type}
        rows="4"
        placeholder={placeholder}
        className="w-full p-4 border-2 rounded-md resize-none"
        id={id}
        name={id}
        value={data}
        onChange={onChange}
        maxLength={maxLength}
      >
      </textarea>
    </div>
  )
}