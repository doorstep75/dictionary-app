import React, { useState } from "react";
import "./App.css";

function App() {
  // State to store the input word and the API result
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [error, setError] = useState("");

  // Fetch the API key from the .env file
  const apiKey = process.env.REACT_APP_DICTIONARY_API_KEY;

  // Handle form submission
  const fetchDefinition = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Reset previous results and error
    setDefinition("");
    setError("");

    try {
      // Make the API call to Merriam-Webster Collegiate Dictionary API
      const response = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`
      );

      console.log("API Response Status:", response.status); // Log HTTP status
      const responseText = await response.text();
      console.log("API Response Text:", responseText); // Log raw response

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid API key or unexpected response.");
      }

      const data = JSON.parse(responseText); // Parse JSON safely
      console.log("Parsed Data:", data); // Log parsed JSON for debugging

      // Extract and display the first definition
      if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
        setDefinition(data[0].shortdef?.[0] || "No definition available.");
      } else {
        setDefinition("No definition found for the entered word.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred while fetching the definition.");
    }
  };

  return (
    <div className="App">
      <h1>Dictionary App</h1>

      {/* Input form */}
      <form onSubmit={fetchDefinition}>
        <input
          type="text"
          placeholder="Enter a word"
          value={word}
          onChange={(e) => setWord(e.target.value)} // Update word state
        />
        <button type="submit">Search</button>
      </form>

      {/* Display result */}
      {error && <p className="error">{error}</p>} {/* Error message */}
      {definition && (
        <div className="result">
          <h2>Definition:</h2>
          <p>{definition}</p>
        </div>
      )}
    </div>
  );
}

export default App;