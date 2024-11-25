### Dictionary App

This app fetches word definitions using the Merriam-Webster API.

### Setup Instructions

	1.	Clone the repository:
  - Run this command in your terminal: git clone https://github.com/doorstep75/dictionary-app.git
	- Change directory into the project folder: cd dictionary-app
	2.	Create a .env file in the project root:
	- Add your API key to the `.env` file in the following format (replace "your-api-key-here" with your actual key): REACT_APP_DICTIONARY_API_KEY=your-api-key-here
	3.	Install dependencies:
	- Run this command in your terminal: npm install
	4.	Start the app:
	- Run this command in your terminal: npm start

### Features

- Enter a word in the input field, and the app will fetch its definition using the Merriam-Webster Collegiate Dictionary API.
- Displays user-friendly error messages if something goes wrong or the word is not found.

### Notes

- Ensure that the .env file is not uploaded to GitHub, as it contains sensitive information like your API key.
- To make the app work, you need a valid API key from Merriam-Webster. Sign up at https://www.dictionaryapi.com/ to get your key.