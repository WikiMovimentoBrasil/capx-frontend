import { render, screen } from "@testing-library/react";
import MobileMenu from "../../components/MobileMenu";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AppProvider } from "@/providers/AppProvider";
import * as ThemeContext from "@/providers/ThemeProvider";

// Mocking the Next.js Router
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

//  Mocking the useTheme hook
jest.mock("@/contexts/ThemeContext", () => ({
  ...jest.requireActual("@/contexts/ThemeContext"),
  useTheme: jest.fn(),
}));

const mockPageContent = {
  "sign-in-button": "Login",
  "sign-out-button": "Logout",
};

describe("MobileMenu", () => {
  beforeEach(() => {
    // Standard configuration for useTheme
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

  it("renders sign in button when not logged in", () => {
    renderWithProviders(
      <MobileMenu session={null} pageContent={mockPageContent} />
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders sign out button when logged in", () => {
    const mockSession = { user: { name: "Test User" } };

    renderWithProviders(
      <MobileMenu session={mockSession} pageContent={mockPageContent} />
    );

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("applies dark mode styles", () => {
    (ThemeContext.useTheme as jest.Mock).mockReturnValue({
      darkMode: true,
      setDarkMode: jest.fn(),
    });

    const { container } = renderWithProviders(
      <MobileMenu session={null} pageContent={mockPageContent} />
    );

    const menuDiv = container.firstChild;
    expect(menuDiv).toHaveClass("bg-capx-dark-box-bg");
    expect(menuDiv).toHaveClass("text-capx-light-bg");
  });

  it("applies light mode styles", () => {
    (ThemeContext.useTheme as jest.Mock).mockReturnValue({
      darkMode: false,
      setDarkMode: jest.fn(),
    });

    const { container } = renderWithProviders(
      <MobileMenu session={null} pageContent={mockPageContent} />
    );

    const menuDiv = container.firstChild;
    expect(menuDiv).toHaveClass("bg-capx-light-bg");
    expect(menuDiv).toHaveClass("text-capx-dark-bg");
  });

  // Clean up the mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
});
