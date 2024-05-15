export default function SubmitButton({ updatingData, children }) {
  return (
    <button
      type="submit"
      disabled={updatingData}
      className="flex w-fit h-fit my-auto bg-capx-secondary-purple text-[#F6F6F6] tracking-wider px-4 sm:px-5 py-2 rounded-full"
    >
      <div>{children}</div>
    </button>
  )
}
