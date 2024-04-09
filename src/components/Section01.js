export default function Section01() {
  return (
    <section className={"flex flex-wrap sm:flex-nowrap w-10/12 h-fit sm:h-screen mx-auto place-content-start py-32 font-montserrat"}>
      <div className="sm:w-2/3 sm:grid sm:place-content-center sm:pr-20">
        {/* Desktop Title */}
        <h1 className="hidden sm:block w-full h-fit font-extrabold text-7xl mb-8">A space to exchange knowledge</h1>
        {/* Desktop Description */}
        <h3 className="hidden sm:block w-full h-fit text-3xl font-regular mb-14">
          Connect with peers, learn and share capacity in a platform made for and by the Wikimedia Movement.
        </h3>
        {/* Mobile Description */}
        <h3 className="block sm:hidden w-full h-fit text-2xl font-regular leading-8 mb-8">
          Connect<br></br>with peers,<br></br>learn and share<br></br>capacity in a platform<br></br>made for and by the<br></br>Wikimedia Movement.
        </h3>
        <div className="w-full">
          <h2 className="w-fit bg-capx-secondary-purple font-extrabold text-xl sm:text-2xl text-[#F6F6F6] mx-auto px-10 py-4 rounded-full">Coming Soon</h2>
        </div>
      </div>
    </section>
  )
}