export default function Section01() {
  return (
    <section id="section01" className={"flex flex-wrap sm:flex-nowrap w-10/12 h-fit sm:h-screen mx-auto place-content-start py-32 font-montserrat"}>
      <div className="sm:w-2/3 sm:grid sm:place-content-center sm:pr-20">
        {/* Title */}
        <h1 className="w-full h-fit font-extrabold text-3xl sm:text-7xl text-center sm:text-left mb-8">A space for exchanging knowledge</h1>
        {/* Main Image Mobile */}
        <div className="block sm:hidden w-full sm:w-1/3 sm:h-fit aspect-square sm:my-auto bg-capx-light-box-bg mb-8 sm:mb-auto"></div>
        {/* Description */}
        <h3 className="w-full h-fit text-2xl sm:text-3xl font-regular text-center sm:text-left mb-8 sm:mb-14">
          Connect with peers, learn, and share capacity in a platform made for and by the Wikimedia Movement.
        </h3>
        {/* Coming Soon */}
        <div className="w-full">
          <h2 className="w-fit bg-capx-secondary-purple font-extrabold text-xl sm:text-2xl text-[#F6F6F6] mx-auto px-10 py-4 rounded-full">Coming Soon</h2>
        </div>
      </div>
      {/* Main Image Desktop */}
      <div className="hidden sm:block w-full sm:w-1/3 sm:h-fit aspect-square sm:my-auto bg-capx-light-box-bg mb-8 sm:mb-auto"></div>
    </section>
  )
}