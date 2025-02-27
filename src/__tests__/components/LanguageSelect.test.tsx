import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSelect from "../../components/LanguageSelect";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppProvider } from "@/contexts/AppContext";
import * as ThemeContext from "@/contexts/ThemeContext";
import { useLanguage } from "@/hooks/useLanguage";

// Mock do hook useLanguage
jest.mock("@/hooks/useLanguage", () => ({
  useLanguage: jest.fn(),
}));

// Mock do useTheme
jest.mock("@/contexts/ThemeContext", () => ({
  ...jest.requireActual("@/contexts/ThemeContext"),
  useTheme: jest.fn().mockReturnValue({
    darkMode: false,
    setDarkMode: jest.fn(),
  }),
}));

describe("LanguageSelect", () => {
  beforeEach(() => {
    (useLanguageSelection as jest.Mock).mockReturnValue({
      fetchLanguages: jest.fn().mockResolvedValue([
        { value: "pt-BR", label: "Português" },
        { value: "en", label: "English" },
        { value: "es", label: "Español" }
      ]),
      fetchTranslations: jest.fn().mockResolvedValue({
        "language-select-pt": "Português",
        "language-select-en": "English",
        "language-select-es": "Español",
      }),
    });
  });

  const mockSetLanguage = jest.fn();
  const mockSetPageContent = jest.fn();

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

  it("renders language selector", () => {
    renderWithProviders(
      <LanguageSelect
        language="en"
        setLanguage={mockSetLanguage}
        setPageContent={mockSetPageContent}
        isMobile={false}
      />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows language options when clicked", async () => {
    renderWithProviders(
      <LanguageSelect
        language="en"
        setLanguage={mockSetLanguage}
        setPageContent={mockSetPageContent}
        isMobile={false}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(await screen.findByText("Português")).toBeInTheDocument();
    expect(await screen.findByText("English")).toBeInTheDocument();
    expect(await screen.findByText("Español")).toBeInTheDocument();
  });

  it("changes language when option is selected", async () => {
    renderWithProviders(
      <LanguageSelect
        language="en"
        setLanguage={mockSetLanguage}
        setPageContent={mockSetPageContent}
        isMobile={false}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const portugueseOption = await screen.findByText("Português");
    fireEvent.click(portugueseOption);

    expect(mockSetLanguage).toHaveBeenCalledWith("pt-BR");
    expect(mockSetPageContent).toHaveBeenCalled();
  });

  it("applies mobile styles when isMobile is true", () => {
    const { container } = renderWithProviders(
      <LanguageSelect
        language="en"
        setLanguage={mockSetLanguage}
        setPageContent={mockSetPageContent}
        isMobile={true}
      />
    );

    expect(container.firstChild).toHaveClass("mobile-language-select");
  });

  it("uses 'en' as fallback when no language is provided", () => {
    renderWithProviders(
      <LanguageSelect
        language=""
        setLanguage={mockSetLanguage}
        setPageContent={mockSetPageContent}
        isMobile={false}
      />
    );

    const select = screen.getByRole("button");
    expect(select).toHaveTextContent("en");
  });

  it("loads translations with 'en' as fallback", async () => {
    renderWithProviders(
      <LanguageSelect
        language=""
        setLanguage={mockSetLanguage}
        setPageContent={mockSetPageContent}
        isMobile={false}
      />
    );

    expect(mockSetPageContent).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
