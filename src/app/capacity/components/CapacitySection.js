export default function CapacitySection({ children }) {
  return (
    <section className="grid grid-cols-1 place-content-start w-10/12 sm:w-8/12 min-h-screen py-32 mx-auto space-y-8">
      {children}
    </section>
  )
}