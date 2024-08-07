export default function Section03({ darkMode }) {
  return (
    <section id="section03" className="flex w-full h-fit my-24">
      <div className="w-10/12 sm:max-w-2xl h-fit my-auto mx-auto">
        <div>
          <h2 className="font-extrabold text-2xl sm:text-5xl text-center mb-6 sm:mb-10">Contact Us</h2>
        </div>
        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "flex flex-wrap w-full px-8 py-10 rounded-3xl space-y-6 mb-6"}>
          <input
            type="text"
            placeholder="Name"
            className={(darkMode ? "bg-capx-dark-bg " : "bg-capx-light-bg ") + "w-full border pl-2 py-2 outline-none"}
          />
          <input
            type="email"
            placeholder="E-mail"
            className={(darkMode ? "bg-capx-dark-bg " : "bg-capx-light-bg ") + "w-full border pl-2 py-2 outline-none"}
          />
          <textarea
            type="text"
            rows="5"
            placeholder="Message"
            className={(darkMode ? "bg-capx-dark-bg " : "bg-capx-light-bg ") + "w-full border pl-2 py-2 outline-none"}
          />
        </div>
        <div className="flex w-full">
          <button className="bg-capx-secondary-purple hover:bg-capx-primary-green font-extrabold text-xl text-[#F6F6F6] hover:text-capx-dark-bg mx-auto px-8 py-3 rounded-full">Submit your message</button>
        </div>
      </div>
    </section>
  )
}