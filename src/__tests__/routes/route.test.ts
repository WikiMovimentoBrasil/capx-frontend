import { GET } from "@/app/api/skill/route";
import { NextRequest } from "next/server";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Skills API Route", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("should fetch skills with limit and offset parameters", async () => {
    // Mock data
    const mockSkills = {
      items: [
        { id: 1, name: "Skill 1" },
        { id: 2, name: "Skill 2" },
      ],
      total: 10,
    };

    // Mock axios response
    mockedAxios.get.mockResolvedValueOnce({ data: mockSkills });

    // Create mock request with search params
    const request = new NextRequest(
      new URL("http://localhost:3000/api/skill?limit=2&offset=0"),
      {
        headers: {
          authorization: "Bearer mock-token",
        },
      }
    );

    // Call the API route
    const response = await GET(request);
    const data = await response.json();

    // Assertions
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.BASE_URL}/skill?limit=2&offset=0`,
      {
        headers: {
          Authorization: "Bearer mock-token",
        },
      }
    );
    expect(data).toEqual(mockSkills);
  });

  it("should handle requests without parameters", async () => {
    // Mock data
    const mockSkills = {
      items: [
        { id: 1, name: "Skill 1" },
        { id: 2, name: "Skill 2" },
      ],
      total: 10,
    };

    // Mock axios response
    mockedAxios.get.mockResolvedValueOnce({ data: mockSkills });

    // Create mock request without search params
    const request = new NextRequest(
      new URL("http://localhost:3000/api/skill"),
      {
        headers: {
          authorization: "Bearer mock-token",
        },
      }
    );

    // Call the API route
    const response = await GET(request);
    const data = await response.json();

    // Assertions
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.BASE_URL}/skill`,
      {
        headers: {
          Authorization: "Bearer mock-token",
        },
      }
    );
    expect(data).toEqual(mockSkills);
  });

  it("should handle errors properly", async () => {
    // Mock axios error
    mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch"));

    // Create mock request
    const request = new NextRequest(
      new URL("http://localhost:3000/api/skill"),
      {
        headers: {
          authorization: "Bearer mock-token",
        },
      }
    );

    // Call the API route
    const response = await GET(request);
    const data = await response.json();

    // Assertions
    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Failed to fetch skills" });
  });
});
