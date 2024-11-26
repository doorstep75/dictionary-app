import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import matchers like toBeInTheDocument
import App from "../App";

beforeEach(() => {
  // Mock the fetch function to simulate an API call
  global.fetch = jest.fn().mockResolvedValue({
    status: 200,
    text: jest.fn().mockResolvedValue(JSON.stringify([
      { shortdef: ["A brief explanation"] }
    ])), // Mock valid JSON response as text
    headers: { get: jest.fn().mockReturnValue("application/json") }, // Mock content-type header
  });
});

afterEach(() => {
  // Clear all mocks and timers after each test
  jest.clearAllMocks();
  jest.clearAllTimers();
});

test("makes a fetch call with the correct URL", async () => {
  const mockApiKey = "test_api_key";
  process.env.REACT_APP_DICTIONARY_API_KEY = mockApiKey; // Set a test API key

  await act(async () => {
    render(<App />);
  });

  // Simulate user input
  const input = screen.getByPlaceholderText(/Enter a word/i);
  fireEvent.change(input, { target: { value: "hello" } });

  // Simulate form submission
  const button = screen.getByText(/Search/i);
  fireEvent.click(button);

  // Wait for the fetch call and verify the results
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/hello?key=${mockApiKey}`
    );

    // Verify definition is displayed
    expect(screen.getByText(/Definition:/i)).toBeInTheDocument();
    expect(screen.getByText(/A brief explanation/i)).toBeInTheDocument();
  });
});