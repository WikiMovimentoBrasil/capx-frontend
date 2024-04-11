export default function Section03() {
  return (
    <section id="section03" className="flex w-full h-screen mx-auto my-auto">
      <div>
        <h2>Contact Us</h2>
      </div>
      <div>
        <input
          type="text"
          placeholder="Name"
        />
        <input
          type="text"
          placeholder="E-mail"
        />
        <textarea
          type="text"
          rows="4"
          placeholder="Message"
        />
      </div>
      <div>
        <button>Submit your message</button>
      </div>
    </section>
  )
}