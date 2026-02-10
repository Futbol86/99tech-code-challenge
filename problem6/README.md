# Resource Management API

A REST-based service developed using Express.js, TypeScript, and MongoDB, designed to manage resources through complete Create, Read, Update, and Delete (CRUD) functionality.

## Key Capabilities

- Fully compliant **REST API** supporting **CRUD** operations
- Written in TypeScript to ensure strong typing and reliability
- MongoDB integration using Mongoose for data modeling
- Input validation powered by Express Validator
- Testing using **Mocha** and **Chai**, including coverage reporting
- Initial database seeding performed automatically on first startup

## Prerequisites

- **Node.js** >= 20.0.0
- **npm** or **yarn**

## Configuration

### Environment Variables

Create a .env file inside the directory (code-challenge-2026/problem5/) and define the following variables:

```env
# MongoDB Connection URI
MONGO_URI=mongodb://localhost:27017/99tech_exams

# Application Port (optional, default is 3000)
PORT=3000
```

### MongoDB Configuration

The application uses Docker Compose to run MongoDB. The MongoDB container will:
- Run on port `27017`
- Store data in a persistent volume (`mongo-data`)
- Use the offical MongoDB 7.0 image

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   Alternatively, manually create `.env` with the configuration above.

## Running the Server

### Development Environment

Run the application in development mode with hot reload:

```bash
npm run dev
```

The API will be available at `http://localhost:3000` (or the custom port specified in `.env` file).

## API Endpoints

All routes are accessible under base path `/api/resources`.

### Create resource
- **POST** `/api/resources`
- **Body:**
  ```json
  {
    "name": "Resource name",
    "context": "Resource context",
    "amount": 100
  }
  ```
- **Response:** 201 Created with the newly created resource

### Retrieve all resources
- **GET** `/api/resources`
- **Optional query parameters:**
  - `name`: Case-insensitive partial name match
  - `minAmount` Filter by minimum amount
  - `maxAmount` Filter by maximum amount
- **Response:** 200 OK with list of matching resources

### Retrieve resource by ID
- **GET** `/api/resources/:id`
- **Response:** 200 OK if found, otherwise 404 Not Found

### Modify an existing resource
- **PUT** `/api/resources/:id`
- **Body:**
  ```json
  {
    "name": "Resource Name",
    "context": "Resource context",
    "amount": 200
  }
  ```
- **Response:** 200 OK with updated resource, or 404 if the resouces does not exist

### Delete Resource
- **DELETE** `/api/resources/:id`
- **Response:** 200 OK on success, or 404 if not found

## Testing

Run the test suite with coverage:

```bash
npm test
```

This will:
- Run all tests in the `src/tests/` directory
