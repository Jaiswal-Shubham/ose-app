# Open Source Economy - Landing Page API

This repository contains the official backend API for the Open Source Economy landing page. Built with Node.js, Express, and TypeScript, this service provides robust, type-safe endpoints for handling user interactions such as contact form submissions and newsletter subscriptions.

The project follows a clean, layered architecture to ensure maintainability, scalability, and ease of testing.

## Architecture Overview

The API is designed with a clear separation of concerns, dividing responsibilities across the following layers:

* **Routes (`/src/routes`)**: Defines the API endpoints and directs incoming requests to the appropriate controllers.
* **Controllers (`/src/controllers`)**: Manages request/response flow, validates input, and orchestrates calls to the service layer.
* **Services (`/src/services`)**: Contains the core business logic and interacts with the database layer to perform data operations.
* **Database (`/src/db`)**: Manages the PostgreSQL database connection and provides a centralized data access interface.

## Local Setup Instructions

### Prerequisites

* Node.js (v18 or later)
* npm or yarn
* A running PostgreSQL instance

### 1. Clone & Install

```bash
git clone <your-repository-url>
cd <project-directory>
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root with your database connection string and a port number.

```env
# .env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
PORT=5000
```

## Database Migration

Run the following command to create the necessary contacts and subscriptions tables.


```bash
npm run migrate
```

## Testing

The project is tested using **Jest** and **Supertest**. The test suite includes unit tests for services and integration tests for the API endpoints.

To run all tests:

```bash
npm test
```

To generate a coverage report:

```bash
npm test -- --coverage
```

## Deployment Notes

This application is optimized for deployment on serverless platforms like **Vercel**. The main Express app is exported from `src/api/index.ts`, which allows for automatic builds and deployment as a serverless function.