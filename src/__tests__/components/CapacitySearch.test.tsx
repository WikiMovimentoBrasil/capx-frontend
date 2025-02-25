import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CapacitySearch } from "@/app/(auth)/capacity/components/CapacitySearch";
import { useSession } from "next-auth/react";
import { useCapacityList } from "@/hooks/useCapacityList";

jest.mock("next-auth/react");
jest.mock("@/hooks/useCapacityList");
jest.mock("@/contexts/AppContext", () => ({
  useApp: () => ({
    isMobile: false,
  }),
}));

describe("CapacitySearch", () => {
  const mockSession = {
    data: {
      user: {
        token: "test-token",
      },
    },
  };

  const mockCapacityList = {
    searchResults: [],
    setSearchResults: jest.fn(),
    descriptions: {},
    wdCodes: {},
    findParentCapacity: jest.fn(),
    fetchCapacityDescription: jest.fn(),
    fetchCapacitySearch: jest.fn(),
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue(mockSession);
    (useCapacityList as jest.Mock).mockReturnValue(mockCapacityList);
  });

  it("renders search input correctly", () => {
    render(
      <CapacitySearch onSearchStart={jest.fn()} onSearchEnd={jest.fn()} />
    );

    expect(
      screen.getByPlaceholderText("Search capacities")
    ).toBeInTheDocument();
  });

  it("calls fetchCapacitySearch when typing in search input", async () => {
    render(
      <CapacitySearch onSearchStart={jest.fn()} onSearchEnd={jest.fn()} />
    );

    const searchInput = screen.getByPlaceholderText("Search capacities");
    fireEvent.change(searchInput, { target: { value: "test" } });

    await waitFor(() => {
      expect(mockCapacityList.fetchCapacitySearch).toHaveBeenCalledWith("test");
    });
  });

  it("calls onSearchStart when search begins", () => {
    const onSearchStart = jest.fn();
    render(
      <CapacitySearch onSearchStart={onSearchStart} onSearchEnd={jest.fn()} />
    );

    const searchInput = screen.getByPlaceholderText("Search capacities");
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(onSearchStart).toHaveBeenCalled();
  });
});
