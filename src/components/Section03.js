export default function Section03({ darkMode }) {
  return (
    <section id="section03" className="flex w-full h-fit my-24">
      <div className="w-10/12 h-fit my-auto mx-auto">
        <div>
          <h2 className="font-extrabold text-2xl text-center mb-6">Contact Us</h2>
        </div>
        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "flex flex-wrap w-full px-8 py-10 rounded-3xl space-y-10 mb-6"}>
          <input
            type="text"
            placeholder="Name"
            className="w-full"
          />
          <input
            type="text"
            placeholder="E-mail"
            className="w-full"
          />
          <textarea
            type="text"
            rows="4"
            placeholder="Message"
            className="w-full"
          />
        </div>
        <div className="flex w-full">
          <button className="bg-capx-secondary-purple font-extrabold text-xl text-[#F6F6F6] mx-auto px-8 py-3 rounded-full">Submit your message</button>
        </div>
      </div>
    </section>
  )
}