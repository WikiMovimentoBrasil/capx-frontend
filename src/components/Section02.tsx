interface Section02Props {
  darkMode: boolean;
}

export default function Section02({ darkMode }: Section02Props) {
  const baseClasses = {
    section: `flex w-full h-screen ${
      darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg"
    }`,
    container:
      "flex flex-wrap place-content-center w-10/12 h-screen mx-auto my-auto",
    mobileTitle: "block sm:hidden font-extrabold text-2xl text-center mb-10",
    iframe: "w-full h-4/6 sm:h-5/6 my-auto rounded-3xl drop-shadow-lg",
  };

  return (
    <section id="section02" className={baseClasses.section}>
      <div className={baseClasses.container}>
        {/* Mobile Title */}
        <h2 className={baseClasses.mobileTitle}>
          Follow up on
          <br />
          meta-wikimedia:
        </h2>

        {/* Capacity Exchange Page on Meta-Wiki */}
        <iframe
          src="https://meta.wikimedia.org/wiki/Capacity_Exchange"
          title="External Page"
          width="100%"
          className={baseClasses.iframe}
        />
      </div>
    </section>
  );
}
