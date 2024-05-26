import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BaseWrapper({ children, session, language, setLanguage, pageContent, setPageContent, darkMode, setDarkMode, mobileMenuStatus, setMobileMenuStatus }) {
  return (
    <main className={(darkMode ? "bg-capx-dark-bg text-capx-light-bg " : "bg-capx-light-bg text-capx-dark-bg ") + (mobileMenuStatus ? "fixed " : "") + " flex flex-wrap flex-col w-full font-montserrat"}>
      <Navbar
        session={session}
        language={language}
        setLanguage={setLanguage}
        pageContent={pageContent}
        setPageContent={setPageContent}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        mobileMenuStatus={mobileMenuStatus}
        setMobileMenuStatus={setMobileMenuStatus}
      />
      {children}
      <Footer darkMode={darkMode} pageContent={pageContent} />
    </main>
  )
}