export default function ViewBoxTitle({ children , customClass}) {
  return (
      <h2 className={customClass ? customClass : "w-full text-2xl font-extrabold text-center"}>
          {children}
      </h2>
  )
}