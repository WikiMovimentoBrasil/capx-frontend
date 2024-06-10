export default function SubmitButton({ updatingData, children }) {
  return (
    <button
      type="submit"
      disabled={updatingData}
      className="flex w-fit h-fit bg-capx-secondary-purple text-[#F6F6F6] tracking-wider font-extrabold text-sm px-4 sm:px-5 py-2 rounded-full"
    >
      {updatingData ?
        <div className={"animate-spin ease-linear h-6 w-6 rounded-full border-4 border-l-white border-r-white border-b-white border-t-capx-primary-green"}></div>
        :
        <div>{children}</div>
      }
    </button>
  )
}
