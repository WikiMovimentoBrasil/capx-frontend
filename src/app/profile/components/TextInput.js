export default function TextInput({ children }) {
  return (
    <div className="w-full space-y-2 mb-8">
      <label className="ml-1">{children}</label>
      <input
        type="text"
        placeholder=""
        className="w-full h-12 pl-4 text-slate-800 border rounded-md"
      >
      </input>
    </div>
  )
}