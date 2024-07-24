import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BaseWrapper({ children, session, language, setLanguage, pageContent, setPageContent, darkMode, setDarkMode, mobileMenuStatus, setMobileMenuStatus }) {
  return (
      <div className={"wrapper min-h-screen " + (darkMode ? "bg-capx-dark-bg text-capx-light-bg " : "bg-capx-light-bg text-capx-dark-bg ")} >
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
          <main className=" flex flex-wrap flex-col w-full font-montserrat">
              {children}
          </main>
          <Footer darkMode={darkMode} pageContent={pageContent}/>
      </div>
  )
}