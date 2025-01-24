import { render, screen } from "@testing-library/react";
import DesktopNavbar from "../../components/DesktopNavbar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AppProvider } from "@/providers/AppProvider";
import * as ThemeContext from "@/providers/ThemeProvider";
import axios from "axios";

// Mock do Next.js Router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
      replace: () => jest.fn(),
      prefetch: () => jest.fn(),
      back: () => jest.fn(),
    };
  },
  usePathname() {
    return "/";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock do useTheme
jest.mock("@/contexts/ThemeContext", () => ({
  ...jest.requireActual("@/contexts/ThemeContext"),
  useTheme: jest.fn(),
}));

// Mock do axios
jest.mock("axios");
(axios.get as jest.Mock).mockImplementation((url: string) => {
  if (url.includes("/languages")) {
    return Promise.resolve({
      data: ["pt-BR", "en", "es"],
    });
  }
  return Promise.resolve({
    data: {
      "sign-in-button": "Entrar",
      "sign-out-button": "Sair",
    },
  });
});

// Mock do LanguageSelect
jest.mock("../../components/LanguageSelect", () => ({
  __esModule: true,
  default: () => <div data-testid="language-select-mock">Language Select</div>,
}));

const mockPageContent = {
  "sign-in-button": "Sign in",
  "sign-out-button": "Sign out",
  "navbar-link-home": "Home",
  "navbar-link-capacities": "Capacities",
  "navbar-link-reports": "Reports",
};

describe("DesktopNavbar", () => {
  beforeEach(() => {
    // Configuração padrão do useTheme
    (ThemeContext.useTheme as jest.Mock).mockReturnValue({
      darkMode: false,
      setDarkMode: jest.fn(),
    });
  });

  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <ThemeProvider>
        <AppProvider>{component}</AppProvider>
      </ThemeProvider>
    );
  };

  it("renders logo correctly", () => {
    renderWithProviders(
      <DesktopNavbar
        session={false}
        pageContent={mockPageContent}
        language="en"
        setLanguage={() => {}}
        setPageContent={() => {}}
      />
    );

    const logo = screen.getByAltText("Capacity Exchange logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders navigation links when logged in", () => {
    renderWithProviders(
      <DesktopNavbar
        session={true}
        pageContent={mockPageContent}
        language="en"
        setLanguage={() => {}}
        setPageContent={() => {}}
      />
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Capacities")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
  });

  it("applies dark mode styles", () => {
    (ThemeContext.useTheme as jest.Mock).mockReturnValue({
      darkMode: true,
      setDarkMode: jest.fn(),
    });

    const { container } = renderWithProviders(
      <DesktopNavbar
        session={false}
        pageContent={mockPageContent}
        language="en"
        setLanguage={() => {}}
        setPageContent={() => {}}
      />
    );

    const navbar = container.firstChild as HTMLElement;
    expect(navbar.className).toContain("bg-capx-dark-bg");
  });

  it("applies light mode styles", () => {
    (ThemeContext.useTheme as jest.Mock).mockReturnValue({
      darkMode: false,
      setDarkMode: jest.fn(),
    });

    const { container } = renderWithProviders(
      <DesktopNavbar
        session={false}
        pageContent={mockPageContent}
        language="en"
        setLanguage={() => {}}
        setPageContent={() => {}}
      />
    );

    const navbar = container.firstChild as HTMLElement;
    expect(navbar.className).toContain("bg-capx-light-bg");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
