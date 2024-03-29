# Datagrid Angular App

This project is an Angular application that leverages the DevExtreme library to create powerful data grids.
The steps I took while developing the application can be find inside Steps.md file inside the project files.

## Table of Contents

- [Datagrid Angular App](#datagrid-angular-app)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Scripts](#scripts)
  - [Dependencies](#dependencies)

## Getting Started

### Prerequisites

Make sure you have the following tools installed on your machine:

- git version 2.34.1.windows.1 or higher
- Node.js: [v18.13.0](https://nodejs.org/en/download/releases/) (Recommended using [NVM](https://github.com/nvm-sh/nvm))
- npm: [v8.19.3](https://www.npmjs.com/package/npm/v/8.19.3) or higher


### Installation

1. **Install Node.js**
   
2. **Install Angular CLI:**
   ```bash
   npm i -g @angular/cli@17.0.0
   ```

3. **Clone the repository:**

   ```bash
   git clone https://github.com/UAt23/Datagrid.git
   ```

4. **Change into the project directory:**

   ```bash
   cd Datagrid
   ```

5. **Install dependencies:**

   ```bash
   npm install
   ```

6. **Start application on local**

   ```bash
   ng serve
   ```

7. **Go to [localhost:4200](http://localhost:4200/)**


## Usage

This is a Data Grid application. It basically have a table to represent data. Table has pagination, search and add functionalities.
It is made responsive for general device screens (can be checked on Chrome Devtools). 


## Scripts

- `npm start`: Start the development server.
- `npm build`: Build the production-ready application.
- `npm watch`: Build and watch for changes in development mode.
- `npm test`: Run tests.

## Dependencies

List and briefly describe the main dependencies of your project.

- **Angular**: A platform for building applications with Angular.
- **Angular CDK**: The Component Dev Kit (CDK) is a set of tools that implement common interaction patterns whilst being unopinionated about their presentation.
- **DevExtreme**: UI components library.
- **FontAwesome**: Icon library.
