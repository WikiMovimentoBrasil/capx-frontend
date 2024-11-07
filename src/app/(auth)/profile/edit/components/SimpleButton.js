export default function SimpleButton({children, type, onClick, to, class_name, bg_color = "bg-capx-secondary-purple hover:bg-capx-primary-green", text_color = "text-[#F6F6F6] hover:text-capx-dark-bg"}) {
  return (
    <button
      type={type}
      className={class_name ? class_name : ("flex w-fit h-fit tracking-wider text-sm px-4 sm:px-5 py-2 rounded-full " + bg_color + " " + text_color)}
      onClick={onClick}
      href={to}
    >
      <div>{children}</div>
    </button>
  )
}