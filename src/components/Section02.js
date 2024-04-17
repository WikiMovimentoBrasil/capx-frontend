export default function Section02({ darkMode }) {
  return (
    <section id="section02" className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "flex w-full h-screen"}>
      <div className="flex flex-wrap place-content-center w-10/12 h-screen mx-auto my-auto">
        {/* Mobile Text */}
        <h2 className="block sm:hidden font-extrabold text-2xl text-center mb-10">Follow up on<br></br>meta-wikimedia:</h2>
        {/* Capacity Exchange Page on Meta-Wiki */}
        <iframe
          src="https://meta.wikimedia.org/wiki/Capacity_Exchange"
          title="External Page"
          width="100%"
          className="w-full h-4/6 sm:h-5/6 my-auto rounded-3xl drop-shadow-lg"
        ></iframe>
      </div>
    </section>
  )
}