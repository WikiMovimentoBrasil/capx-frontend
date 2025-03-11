import { render, screen, fireEvent } from "@testing-library/react";
import MobileMenuLinks from "../../components/MobileMenuLinks";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppProvider } from "@/contexts/AppContext";
import * as ThemeContext from "@/contexts/ThemeContext";
import { useOrganization } from "@/hooks/useOrganizationProfile";

// Next.js Router's mock
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

// useTheme's mock
jest.mock("@/contexts/ThemeContext", () => ({
  ...jest.requireActual("@/contexts/ThemeContext"),
  useTheme: jest.fn().mockReturnValue({
    darkMode: false,
    setDarkMode: jest.fn(),
  }),
}));

// useOrganization's mock
jest.mock("@/hooks/useOrganizationProfile", () => ({
  useOrganization: jest.fn(),
}));

const mockPageContent = {
  "navbar-link-home": "Home",
  "navbar-link-capacities": "Capacities",
  "navbar-link-reports": "Reports",
  "navbar-link-dark-mode": "Dark Mode",
  "navbar-link-profiles": "Profiles",
  "navbar-link-organization-profile": "Organization Profile",
  "navbar-user-profile": "User Profile",
};

describe("MobileMenuLinks", () => {
  beforeEach(() => {
    (ThemeContext.useTheme as jest.Mock).mockReturnValue({
      darkMode: false,
      setDarkMode: jest.fn(),
    });
    (useOrganization as jest.Mock).mockReturnValue({
      organizations: [
        { id: 1, display_name: "Org 1" },
        { id: 2, display_name: "Org 2" },
      ],
      isOrgManager: true,
    });
  });

  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <ThemeProvider>
        <AppProvider>{component}</AppProvider>
      </ThemeProvider>
    );
  };

  it("renders menu links when logged in", () => {
    const mockSession = { user: { name: "Test User" } };
    const handleMenuStatus = jest.fn();

    renderWithProviders(
      <MobileMenuLinks
        session={mockSession}
        pageContent={mockPageContent}
        handleMenuStatus={handleMenuStatus}
      />
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
    expect(screen.getByText("Profiles")).toBeInTheDocument();
  });

  it("calls handleMenuStatus when a link is clicked", () => {
    const mockSession = { user: { name: "Test User" } };
    const handleMenuStatus = jest.fn();

    renderWithProviders(
      <MobileMenuLinks
        session={mockSession}
        pageContent={mockPageContent}
        handleMenuStatus={handleMenuStatus}
      />
    );

    const homeLink = screen.getByText("Home");
    fireEvent.click(homeLink);

    expect(handleMenuStatus).toHaveBeenCalled();
  });

  it("applies dark mode styles", () => {
    (ThemeContext.useTheme as jest.Mock).mockReturnValue({
      darkMode: true,
      setDarkMode: jest.fn(),
    });

    const mockSession = { user: { name: "Test User" } };

    renderWithProviders(
      <MobileMenuLinks
        session={mockSession}
        pageContent={mockPageContent}
        handleMenuStatus={() => {}}
      />
    );

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveClass("text-capx-light-bg");
    });
  });

  it("renders organization profiles for org managers", async () => {
    const mockSession = { user: { name: "Test User", token: "token" } };

    renderWithProviders(
      <MobileMenuLinks
        session={mockSession}
        pageContent={mockPageContent}
        handleMenuStatus={jest.fn()}
      />
    );

    const profilesButton = screen.getByText(
      mockPageContent["navbar-link-profiles"]
    );
    fireEvent.click(profilesButton);

    expect(screen.getByText("Org 1")).toBeInTheDocument();
    expect(screen.getByText("Org 2")).toBeInTheDocument();
  });

  it("navigates to correct organization profile", () => {
    const mockSession = { user: { name: "Test User", token: "token" } };
    const handleMenuStatus = jest.fn();

    renderWithProviders(
      <MobileMenuLinks
        session={mockSession}
        pageContent={mockPageContent}
        handleMenuStatus={handleMenuStatus}
      />
    );

    const profilesButton = screen.getByText(
      mockPageContent["navbar-link-profiles"]
    );
    fireEvent.click(profilesButton);

    const org1Button = screen.getByText("Org 1");
    fireEvent.click(org1Button);

    expect(handleMenuStatus).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
