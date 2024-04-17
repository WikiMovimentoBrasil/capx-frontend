export default function TextArea({ children }) {
  return (
    <div className="w-full space-y-2 mb-8">
      <label className="ml-1">{children}</label>
      <textarea
        type="text"
        rows="4"
        placeholder=""
        className="w-full pl-4 py-4 text-slate-800 border rounded-md resize-none"
      >
      </textarea>
    </div>
  )
}