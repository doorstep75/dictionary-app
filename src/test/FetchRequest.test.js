// This test checks that the fetch function is called with the correct URL when the form is submitted.
// It mocks the fetch function to prevent actual network calls and verifies that the correct API URL 
// is used for the request.

x
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  // Mock the fetch function to simulate a successful API call
  global.fetch = jest.fn().mockResolvedValue({
    status: 200,
    json: jest.fn().mockResolvedValue([]),  // Mock response content if necessary
  });
});

afterEach(() => {
  fetch.mockClear(); // Clear the mock after each test
});

test("makes a fetch call with the correct URL", async () => {
  const mockApiKey = "test_api_key";
  process.env.REACT_APP_DICTIONARY_API_KEY = mockApiKey; // Set a test API key

  render(<App />);

  // Simulate user input
  const input = screen.getByPlaceholderText(/Enter a word/i);
  fireEvent.change(input, { target: { value: "hello" } });

  // Simulate form submission
  const button = screen.getByText(/Search/i);
  fireEvent.click(button);

  // Wait for the fetch call to be made and check if it was called with the correct URL
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/hello?key=${mockApiKey}`
    );
  });
});