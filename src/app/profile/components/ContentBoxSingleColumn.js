export default function ContentBoxSingleColumn({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 w-full sm:w-8/12 h-fit place-items-center mx-auto text-center text-xl rounded-lg px-12 py-8">
      {children}
    </div>
  )
}