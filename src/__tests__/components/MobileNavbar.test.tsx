import { render, screen, fireEvent } from "@testing-library/react";
import MobileNavbar from "../../components/MobileNavbar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AppProvider } from "@/providers/AppProvider";
import * as ThemeContext from "@/providers/ThemeProvider";
import * as AppContext from "@/providers/AppProvider";
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

// useApp's mock
jest.mock("@/contexts/AppContext", () => ({
  ...jest.requireActual("@/contexts/AppContext"),
  useApp: jest.fn(),
}));

// Axios's mock
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

// LanguageSelect's mock
jest.mock("../../components/LanguageSelect", () => ({
  __esModule: true,
  default: () => <div data-testid="language-select-mock">Language Select</div>,
}));

const mockPageContent = {
  "sign-in-button": "Sign in",
  "sign-out-button": "Sign out",
};

describe("MobileNavbar", () => {
  beforeEach(() => {
    // Standard configuration for useTheme
    (ThemeContext.useTheme as jest.Mock).mockReturnValue({
      darkMode: false,
      setDarkMode: jest.fn(),
    });

    // Standard configuration for useApp
    (AppContext.useApp as jest.Mock).mockReturnValue({
      isMobile: true,
      mobileMenuStatus: false,
      setMobileMenuStatus: jest.fn(),
    });

    // Clear axios's mocks after each test
    jest.clearAllMocks();
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
      <MobileNavbar
        session={null}
        pageContent={mockPageContent}
        language="en"
        setLanguage={() => {}}
        setPageContent={() => {}}
      />
    );

    const logo = screen.getByAltText("Capacity Exchange logo");
    expect(logo).toBeInTheDocument();
  });

  it("toggles mobile menu when burger menu is clicked", () => {
    const mockSession = { user: { name: "Test User" } };
    const setMobileMenuStatus = jest.fn();

    (AppContext.useApp as jest.Mock).mockReturnValue({
      isMobile: true,
      mobileMenuStatus: false,
      setMobileMenuStatus,
    });

    renderWithProviders(
      <MobileNavbar
        session={mockSession}
        pageContent={mockPageContent}
        language="en"
        setLanguage={() => {}}
        setPageContent={() => {}}
      />
    );

    const burgerMenu = screen.getByAltText("Burger Menu");
    fireEvent.click(burgerMenu);

    expect(setMobileMenuStatus).toHaveBeenCalledWith(true);
  });

  it("applies dark mode styles", () => {
    (ThemeContext.useTheme as jest.Mock).mockReturnValue({
      darkMode: true,
      setDarkMode: jest.fn(),
    });

    const { container } = renderWithProviders(
      <MobileNavbar
        session={null}
        pageContent={mockPageContent}
        language="en"
        setLanguage={() => {}}
        setPageContent={() => {}}
      />
    );

    const navbar = container.firstChild as HTMLElement;
    expect(navbar?.className).toContain("bg-capx-dark-bg");
  });

  it("applies light mode styles", () => {
    (ThemeContext.useTheme as jest.Mock).mockReturnValue({
      darkMode: false,
      setDarkMode: jest.fn(),
    });

    const { container } = renderWithProviders(
      <MobileNavbar
        session={null}
        pageContent={mockPageContent}
        language="en"
        setLanguage={() => {}}
        setPageContent={() => {}}
      />
    );

    const navbar = container.firstChild;
    expect(navbar).toHaveClass("bg-capx-light-bg");
  });

  // Limpa os mocks após cada teste
  afterEach(() => {
    jest.clearAllMocks();
  });
});
