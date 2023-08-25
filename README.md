# Shop Project

This is the documentation for the "Shop" project, a web application built using Node.js, Express, MongoDB, and SOAP.

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [ESLint](#eslint)
- [Contributing](#contributing)
- [License](#license)

## Description

The "Shop" project is a web application designed to provide a platform for managing mens and womens clothing and related operations. It includes features such as user authentication, product listing, and more.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed (Recommended version: 16+)
- MongoDB instance running (You can use a local or remote instance)
- Access to a SOAP service

## Installation

1. Clone the repository:
   git clone https://github.com/annab77/shop.git

2. Navigate to the project directory:

````bash
   cd shop

3. Install the project dependencies:
```bash
   npm install

4. Create a `.env` file in the project root and configure your environment variables:
   PORT=3004
   MONGO_URL='mongodb+srv://annab77:3theBirdInblueSky82@cluster0.ejkvjh4.mongodb.net/shop'
   ACCESS_SECRET
   REFRESH_SECRET

## Usage

1. Start the development server:
```bash
   npm run dev # run nodemon script


2. Access the application in your web browser:
   http://localhost:3004

## Technologies

- Node.js
- Express.js
- MongoDB
- SOAP
- EJS (Embedded JavaScript templating)
- Bootstrap (for styling)

## ESLint

ESLint is a tool for identifying and fixing problems in your JavaScript code. It helps you maintain a consistent coding style and catch errors before they become problematic. This project uses ESLint to ensure code quality.

To run ESLint and fix linting issues:
```bash
npm run lint       # Run ESLint
npm run lint-fix   # Run ESLint and auto-fix issues when possible

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed ISC.
````
