import NextLink from "next/link";
import Image from "next/image";
import AuthButton from "./AuthButton";
import LanguageSelect from "./LanguageSelect";
import CapXLogo from "../../public/static/images/capx_minimalistic_logo.svg";
import DarkModeButton from "./DarkModeButton";
import { useTheme } from "@/contexts/ThemeContext";
import ProfileSelect from "./ProfileSelect";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import router from "next/router";
// import { Session } from "next-auth";

export interface DesktopNavbarProps {
  pageContent: any;
  language: string;
  setLanguage: (language: string) => void;
  setPageContent: (pageContent: any) => void;
  session: any;
}

export default function DesktopNavbar({
  pageContent,
  language,
  setLanguage,
  setPageContent,
  session
}: DesktopNavbarProps) {
  const { darkMode, setDarkMode } = useTheme();
  // const { data: session, status } = useSession(); // status pode ser "loading", "authenticated" ou "unauthenticated"
  // const { data: session, status } = useSession(); // Usando diretamente a sessão fornecida pelo useSession
  // const [currentSession, setCurrentSession] = useState<any>(session);  // Armazenando a sessão no estado

  // let currentSession = session;


  // useEffect(() => {
  //   console.log("Sessão atualizada:", session); // Para depuração
  // }, [session]); 


  // useEffect(() => {
  //   // Lógica aqui se precisar fazer algo quando o status da sessão mudar
  //   if (status === "authenticated") {
  //     console.log("Usuário autenticado", session);
  //   } else if (status === "unauthenticated") {
  //     console.log("Usuário não autenticado");
  //   }
  // }, [status, session]);

    // Atualiza currentSession quando a sessão mudar
    // useEffect(() => {
    //   if (session) {
    //     setCurrentSession(session);
    //   } else {
    //     setCurrentSession(null);
    //   }
    // }, [session]); 

    // useEffect(() => {
    //   console.log("Current session updated:", currentSession);
    // }, [currentSession]); // Para verificar se a currentSession foi atualizada corretamente
  


  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const current = await getSession();
  //     console.log("Fetched session:", current);
  //     return current;
  //   };

  //   currentSession = fetchSession().finally(() => {
  //     console.log("currentSession session:", currentSession);
  //   });
  //   console.log("currentSession session:", currentSession);
  // }, [currentSession]);
  
  // console.log("DesktopNavbar session", currentSession);


  // useEffect(() => {
  //   console.log("useEffect do DESKTOPNAV:", currentSession);
  //   const fetchSession = async () => {
  //     const session = await getSession();
  //     console.log("Fetched session:", session);
  //     setCurrentSession(session); // Atualiza o estado com a sessão
  //   };

  //   fetchSession();
  // }, []); 

  // useEffect(() => {
  //   // Verifica se já há uma sessão
  //   if (currentSession) return;

  //   const fetchSession = async () => {
  //     const session = await getSession();
  //     console.log("Fetched session:", session);
  //     setCurrentSession(session); // Atualiza o estado com a sessão
  //   };

  //   fetchSession();
  // }, [currentSession]);

  // useEffect(() => {
  //   if (session && !currentSession) { // Verifica se a sessão já foi carregada
  //     console.log("Fetched session:", session);
  //     setCurrentSession(session);  // Atualiza o estado com a sessão
  //   }
  // }, [session, currentSession]);  

  // if (status === "loading") {
  //   // Exiba um carregamento ou placeholder enquanto a sessão é carregada
  //   return <div>Loading...</div>;
  // }

  const menuItems = [
    { title: pageContent["navbar-link-home"], to: "/home", active: true },
    {
      title: pageContent["navbar-link-capacities"],
      to: "/capacity",
      active: true,
    },
    { title: pageContent["navbar-link-reports"], to: "/reports", active: true },
    {
      title: pageContent["navbar-link-organization"],
      to: "/organization_profile",
      active: true,
    },
  ];

  return (
    <div
      className={`${
        darkMode
          ? "bg-capx-dark-box-bg text-capx-dark-text"
          : "bg-capx-light-bg text-capx-light-text"
      }`}
    >
      <div className="flex w-full h-full justify-between pb-6 pt-10 px-4 md:px-8 lg:px-12 max-w-screen-xl mx-auto">
        <div className="flex-none relative my-auto ml-4 sm:ml-0">
          <NextLink href="/">
            <div className="relative w-[80px] h-[80px]">
              <Image
                priority
                src={CapXLogo}
                alt="Capacity Exchange logo"
                className="w-[100px] h-[100px]"
                objectFit="contain"
              />
            </div>
          </NextLink>
        </div>
        {session ? (
          <div className="flex flex-[0.5] flex-row xl:flex items-center justify-end gap-[43px] ml-[90px]">
            {menuItems.map((item, index) => (
              <NextLink
                key={"navbar-link-" + index.toString()}
                href={item.to}
                className="flex text-center font-[Montserrat] text-[20px] not-italic font-normal leading-[normal] my-auto cursor-pointer hover:border-b hover:border-current"
              >
                {item.title}
              </NextLink>
            ))}
          </div>
        ) : null}

        <div className="flex flex-[1.5] items-center justify-end gap-[24px]">
          <DarkModeButton />
          {session ? <ProfileSelect /> : null}
          <LanguageSelect
            isMobile={false}
            language={language}
            setLanguage={setLanguage}
            setPageContent={setPageContent}
          />

          {session ? (
            <AuthButton
              message={pageContent["sign-out-button"]}
              isSignOut={true}
              customClass="inline-flex px-[19px] py-[8px] justify-center items-center gap-[10px] rounded-[8px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] flex h-[64px] px-[32px] py-[16px] justify-center items-center gap-[8px]"
            />
          ) : (
            <AuthButton
              message={pageContent["sign-in-button"]}
              isSignOut={false}
              customClass="inline-flex px-[19px] py-[8px] justify-center items-center gap-[10px] rounded-[8px] bg-[#851970] text-[#F6F6F6] text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] flex h-[64px] px-[32px] py-[16px] justify-center items-center gap-[8px]"
            />
          )}
        </div>
      </div>
    </div>
  );
}
