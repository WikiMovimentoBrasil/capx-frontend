import { render, screen } from "@testing-library/react";
import CallToActionSection from "../../components/CallToActionSection";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AppProvider } from "@/providers/AppProvider";

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

const mockPageContent = {
  "body-home-section01-call-to-action-title": "Título de teste",
  "body-home-section01-call-to-action-description": "Descrição de teste",
  "body-home-section01-call-to-action-button01": "Botão 1",
  "body-home-section01-call-to-action-button02": "Botão 2",
};

// Mock do matchMedia
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("CallToActionSection", () => {
  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <ThemeProvider>
        <AppProvider>{component}</AppProvider>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it("renders desktop version correctly", () => {
    // Mock window.innerWidth para simular desktop
    global.innerWidth = 1200;
    global.dispatchEvent(new Event("resize"));

    renderWithProviders(<CallToActionSection pageContent={mockPageContent} />);

    expect(screen.getByText("Título de teste")).toBeInTheDocument();
    expect(screen.getByText("Descrição de teste")).toBeInTheDocument();
    expect(screen.getByText("Botão 1")).toBeInTheDocument();
    expect(screen.getByText("Botão 2")).toBeInTheDocument();
  });

  it("renders mobile version correctly", () => {
    // Mock window.innerWidth para simular mobile
    global.innerWidth = 375;
    global.dispatchEvent(new Event("resize"));

    renderWithProviders(<CallToActionSection pageContent={mockPageContent} />);

    expect(screen.getByText("Título de teste")).toBeInTheDocument();
    expect(screen.getByText("Descrição de teste")).toBeInTheDocument();
    expect(screen.getByText("Botão 1")).toBeInTheDocument();
    expect(screen.getByText("Botão 2")).toBeInTheDocument();
  });

  /*  it("applies dark mode styles correctly", () => {
    // Simula preferência de tema escuro
    localStorageMock.getItem.mockReturnValue("dark");

    const { container } = renderWithProviders(
      <CallToActionSection pageContent={mockPageContent} />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-capx-dark-bg");
  }); */

  it("applies light mode styles correctly", () => {
    // Simula preferência de tema claro
    localStorageMock.getItem.mockReturnValue("light");

    const { container } = renderWithProviders(
      <CallToActionSection pageContent={mockPageContent} />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-capx-light-bg");
  });
});
