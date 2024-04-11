export default function Section03() {
  return (
    <section id="section03" className="flex w-full h-fit my-24">
      <div className="w-10/12 h-fit my-auto mx-auto">
        <div>
          <h2 className="font-extrabold text-2xl text-center mb-6">Contact Us</h2>
        </div>
        <div className="flex flex-wrap w-full bg-capx-light-box-bg px-8 py-10 rounded-3xl space-y-10">
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
        <div>
          <button>Submit your message</button>
        </div>
      </div>
    </section>
  )
}