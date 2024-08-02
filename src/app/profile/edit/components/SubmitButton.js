export default function SubmitButton({ updatingData, children, form }) {
  return (
    <button
      type="submit"
      form={form}
      disabled={updatingData}
      className="flex w-fit h-fit bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg tracking-wider font-extrabold text-sm px-4 sm:px-5 py-2 rounded-full"
    >
      {updatingData ?
        <div className={"animate-spin ease-linear h-6 w-6 rounded-full border-4 border-l-white border-r-white border-b-white border-t-capx-accessible-green"}></div>
        :
        <div>{children}</div>
      }
    </button>
  )
}
