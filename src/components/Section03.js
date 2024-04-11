export default function Section03() {
  return (
    <section id="section03" className="flex w-full h-fit my-24">
      <div className="w-10/12 h-fit my-auto mx-auto">
        <div>
          <h2 className="font-extrabold text-2xl text-center mb-6">Contact Us</h2>
        </div>
        <div>
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