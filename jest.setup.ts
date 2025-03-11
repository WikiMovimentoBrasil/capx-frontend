import "@testing-library/jest-dom";
import React from "react";

// Use web standard fetch API types
global.Request = class extends Request {
  constructor(input: RequestInfo | URL, init?: RequestInit) {
    super(input, init);
  }
} as typeof Request;
global.Response = Response as typeof Response;
global.Headers = Headers as typeof Headers;

// Mock do matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock do next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { fetchPriority, priority, ...rest } = props;
    return React.createElement("img", {
      ...rest,
      priority: priority ? "true" : undefined,
    });
  },
}));
