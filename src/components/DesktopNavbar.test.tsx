import React from "react";
import DesktopNavbar from "./DesktopNavbar";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

// Mock next/navigation instead of next/router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      pathname: "/",
    };
  },
  usePathname() {
    return "/";
  },
}));

// Mock next/link with explicit return
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  },
}));

// Mock next/image with priority attribute handling
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => {
    // Convert priority to string if it's a boolean
    const priorityProp =
      typeof priority === "boolean" ? { priority: priority.toString() } : {};
    return <img {...props} {...priorityProp} />;
  },
}));

describe("DesktopNavbar", () => {
  // Teste para verificar a presença do botão de logout quando logado
  it("shows logout button when logged in", () => {
    render(
      <DesktopNavbar
        pageContent="home"
        language="pt-BR"
        setLanguage={() => {}}
        setPageContent={() => {}}
        darkMode={false}
        setDarkMode={() => {}}
        // outras props necessárias
        session={true}
      />
    );
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });

  // Teste para verificar a presença do botão de login quando deslogado
  it("shows login button when not logged in", () => {
    render(
      <DesktopNavbar
        pageContent="home"
        language="pt-BR"
        setLanguage={() => {}}
        setPageContent={() => {}}
        darkMode={false}
        setDarkMode={() => {}}
        session={false}
      />
    );
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  // Teste para verificar a funcionalidade do botão de dark mode
  it("toggles dark mode on button click", () => {
    const setDarkMode = jest.fn();
    render(
      <DesktopNavbar
        pageContent="home"
        language="pt-BR"
        setLanguage={() => {}}
        setPageContent={() => {}}
        darkMode={false}
        setDarkMode={setDarkMode}
        session={false}
      />
    );
    const darkModeButton = screen.getByRole("button", { name: /dark mode/i });
    userEvent.click(darkModeButton);
    expect(setDarkMode).toHaveBeenCalledWith(true);
  });
});
