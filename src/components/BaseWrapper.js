import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BaseWrapper({ children, session, darkMode, setDarkMode }) {
  return (
    <main className={(darkMode ? "bg-capx-dark-bg text-capx-light-bg " : "bg-capx-light-bg text-capx-dark-bg ") + " flex flex-wrap flex-col w-full font-montserrat"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode}></Navbar>
      {children}
      <Footer darkMode={darkMode}></Footer>
    </main>
  )
}