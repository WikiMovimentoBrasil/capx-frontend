import { render, screen, fireEvent } from "@testing-library/react";
import CapacityListMainWrapper from "@/app/(auth)/capacity/components/CapacityListMainWrapper";
import { useCapacityList } from "@/hooks/useCapacityList";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");
jest.mock("@/hooks/useCapacityList");
jest.mock("@/contexts/AppContext", () => ({
  useApp: () => ({
    pageContent: {
      "body-capacity-title": "Capacities",
      "body-capacity-subtitle": "Explore capacities",
    },
    language: "en",
    isMobile: false,
  }),
}));

describe("CapacityListMainWrapper", () => {
  const mockSession = {
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
    skill_type: ["1"],
    skill_wikidata_item: "Q123",
  };

  const mockChildCapacity = {
    code: 2,
    name: "Child Capacity",
    color: "organizational",
    icon: "/child-icon.svg",
    hasChildren: true,
    parentCapacity: mockRootCapacity,
    skill_type: ["1"],
    skill_wikidata_item: "Q456",
  };

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
    fetchRootCapacities: jest.fn(),
    fetchCapacityDescription: jest.fn(),
    isLoading: false,
    error: null,
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue(mockSession);
    (useCapacityList as jest.Mock).mockReturnValue(mockCapacityList);
  });

  it("renders root capacities correctly", () => {
    render(<CapacityListMainWrapper />);

    expect(screen.getByText("Root Capacity")).toBeInTheDocument();
  });

  it("expands capacity when clicking arrow button", () => {
    render(<CapacityListMainWrapper />);

    const expandButton = screen.getByAltText("Expand");
    fireEvent.click(expandButton);

    expect(screen.getByText("Child Capacity")).toBeInTheDocument();
  });

  it("shows capacity description when clicking info button", async () => {
    render(<CapacityListMainWrapper />);

    const infoButton = screen.getByAltText("Root Capacity").closest("button");
    fireEvent.click(infoButton!);

    expect(mockCapacityList.fetchCapacityDescription).toHaveBeenCalledWith(1);
    expect(await screen.findByText("Root description")).toBeInTheDocument();
  });

  it("fetches root capacities on mount", () => {
    render(<CapacityListMainWrapper />);

    expect(mockCapacityList.fetchRootCapacities).toHaveBeenCalled();
  });

  it("shows loading state when isLoading is true", () => {
    (useCapacityList as jest.Mock).mockReturnValue({
      ...mockCapacityList,
      isLoading: true,
    });

    render(<CapacityListMainWrapper />);

    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  });

  it("shows error state when there is an error", () => {
    (useCapacityList as jest.Mock).mockReturnValue({
      ...mockCapacityList,
      error: "Test error",
    });

    render(<CapacityListMainWrapper />);

    expect(screen.getByText("Test error")).toBeInTheDocument();
  });
});
