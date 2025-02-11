import { render, screen, fireEvent } from "@testing-library/react";
import AuthButton from "../../components/AuthButton";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppProvider } from "@/contexts/AppContext";
import * as ThemeContext from "@/contexts/ThemeContext";

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

describe("AuthButton", () => {
  beforeEach(() => {
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

  it("renders sign in button correctly", () => {
    renderWithProviders(
      <AuthButton
        message="Sign In"
        isSignOut={false}
        customClass="test-class"
      />
    );

    const button = screen.getByText("Sign In");
    expect(button).toBeInTheDocument();
    expect(button.parentElement).toHaveClass("test-class");
  });

  it("renders sign out button correctly", () => {
    renderWithProviders(
      <AuthButton
        message="Sign Out"
        isSignOut={true}
        customClass="test-class"
      />
    );

    const button = screen.getByText("Sign Out");
    expect(button).toBeInTheDocument();
    expect(button.parentElement).toHaveClass("test-class");
  });

  it("applies dark mode styles", () => {
    (ThemeContext.useTheme as jest.Mock).mockReturnValue({
      darkMode: true,
      setDarkMode: jest.fn(),
    });

    renderWithProviders(
      <AuthButton
        message="Sign In"
        isSignOut={false}
        customClass="test-class"
      />
    );

    const button = screen.getByText("Sign In");
    expect(button.parentElement).toHaveClass("bg-capx-dark-primary");
  });

  it("applies light mode styles", () => {
    (ThemeContext.useTheme as jest.Mock).mockReturnValue({
      darkMode: false,
      setDarkMode: jest.fn(),
    });

    renderWithProviders(
      <AuthButton
        message="Sign In"
        isSignOut={false}
        customClass="test-class"
      />
    );

    const button = screen.getByText("Sign In");
    expect(button.parentElement).toHaveClass("bg-capx-light-primary");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
