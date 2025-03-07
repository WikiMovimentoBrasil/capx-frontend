import { render, screen, fireEvent } from "@testing-library/react";
import CapacityListMainWrapper from "@/app/(auth)/capacity/components/CapacityListMainWrapper";
import { useCapacityList } from "@/hooks/useCapacityList";
import { useSession } from "next-auth/react";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Next.js App Router's mock
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("next-auth/react");
jest.mock("@/hooks/useCapacityList");
jest.mock("@/contexts/AppContext", () => ({
  useApp: () => ({
    pageContent: {
      "body-capacity-title": "Capacities",
      "body-capacity-subtitle": "Explore capacities",
      "capacity-card-expand-capacity": "Expand capacity",
      "capacity-card-explore-capacity": "Explore capacity",
      "capacity-card-info": "Information",
    },
    language: "en",
    isMobile: false,
  }),
}));

// ThemeContext's mock
jest.mock("@/contexts/ThemeContext", () => {
  const originalModule = jest.requireActual("@/contexts/ThemeContext");
  return {
    ...originalModule,
    useTheme: () => ({
      darkMode: false,
      setDarkMode: jest.fn(),
    }),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe("CapacityListMainWrapper", () => {
  // Correct mock for useSession
  const mockSession = {
    status: "authenticated",
    data: {
      user: {
        token: "test-token",
      },
    },
  };

  const mockRootCapacity = {
    code: 1,
    name: "Root Capacity",
    color: "organizational",
    icon: "/test-icon.svg",
    hasChildren: true,
    skill_type: [],
    skill_wikidata_item: "",
  };

  const mockChildCapacity = {
    code: 2,
    name: "Child Capacity",
    color: "organizational",
    icon: "/child-icon.svg",
    hasChildren: true,
    parentCapacity: mockRootCapacity,
    skill_type: [],
    skill_wikidata_item: "",
  };

  // Complete mock for useCapacityList
  const mockCapacityList = {
    rootCapacities: [mockRootCapacity],
    childrenCapacities: {
      1: [mockChildCapacity],
    },
    descriptions: {
      1: "Root description",
      2: "Child description",
    },
    wdCodes: {
      1: "WD123",
      2: "WD456",
    },
    searchResults: [],
    setSearchResults: jest.fn(),
    capacityById: undefined,
    isLoading: { root: false },
    error: null,
    findParentCapacity: jest.fn(),
    fetchRootCapacities: jest.fn(),
    fetchCapacitiesByParent: jest.fn().mockResolvedValue([mockChildCapacity]),
    fetchCapacityDescription: jest.fn().mockResolvedValue("Root description"),
    fetchCapacityById: jest.fn(),
    fetchCapacitySearch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue(mockSession);
    (useCapacityList as jest.Mock).mockReturnValue(mockCapacityList);
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  it("renders root capacities correctly", () => {
    renderWithProviders(<CapacityListMainWrapper />);

    expect(screen.getByText("Root Capacity")).toBeInTheDocument();
  });

  it("expands capacity when clicking arrow button", async () => {
    renderWithProviders(<CapacityListMainWrapper />);

    // Find the expand button by aria-label or alt text of the image
    const expandButton = screen.getByAltText("Expand capacity");
    fireEvent.click(expandButton.closest("button") || expandButton);

    // Verify that the function was called with the correct code
    expect(mockCapacityList.fetchCapacitiesByParent).toHaveBeenCalledWith("1");

    // Since fetchCapacitiesByParent returns a Promise, we need to wait for the component to be updated with the child data
    expect(await screen.findByText("Child Capacity")).toBeInTheDocument();
  });

  it("shows capacity description when clicking info button", async () => {
    renderWithProviders(<CapacityListMainWrapper />);

    // Find the info button by aria-label
    const infoButton = screen.getByLabelText("Information");
    fireEvent.click(infoButton);

    // Verify that the function was called with the correct code
    expect(mockCapacityList.fetchCapacityDescription).toHaveBeenCalledWith(1);

    // Verify that the description is displayed
    expect(await screen.findByText("Root description")).toBeInTheDocument();
  });

  it("fetches root capacities on mount", () => {
    renderWithProviders(<CapacityListMainWrapper />);

    expect(mockCapacityList.fetchRootCapacities).toHaveBeenCalled();
  });

  it("shows loading state when isLoading.root is true", () => {
    // Update the mock to simulate the loading state
    (useCapacityList as jest.Mock).mockReturnValue({
      ...mockCapacityList,
      isLoading: { root: true },
    });

    renderWithProviders(<CapacityListMainWrapper />);

    // Verify that the loading component is rendered using the data-testid
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  });
});
