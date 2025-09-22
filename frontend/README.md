# Open Source Economy - Frontend Application

This repository contains the official frontend codebase for the Open Source Economy landing page. It is a modern, scalable, and type-safe web application built with React, TypeScript, and Vite.

## Table of Contents

1.  [Architecture Overview](#architecture-overview)
2.  [Local Development Setup](#local-development-setup)
3.  [Database and Migrations](#database-and-migrations)
4.  [Running Tests](#running-tests)
5.  [Deployment Notes](#deployment-notes)

---

## Architecture Overview

This project was architected with a focus on type safety, modularity, and scalability, adhering to professional development standards.

### Core Stack

* **Framework**: [React](https://react.dev/) (v18+) for building the user interface.
* **Language**: [TypeScript](https://www.typescriptlang.org/) for static typing, enhancing code quality and developer experience.
* **Build Tool**: [Vite](https://vitejs.dev/) for a fast development server and optimized production builds.
* **Testing**: [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and component testing.

### Folder Structure

The codebase is organized into a feature-based modular structure to ensure a clear separation of concerns:

* `src/components`: Contains small, reusable, and "dumb" UI components that are application-agnostic (e.g., `Icon`, `FormField`, `ErrorModal`).
* `src/features`: Contains "smart" components that encapsulate business logic for specific features of the application (e.g., `ContactForm`, `RiskScoreWidget`).
* `src/hooks`: Holds custom React hooks for abstracting reusable stateful logic, such as the `useApi` hook for fetching data.
* `src/pages`: Top-level components that assemble features into a complete page or view (e.g., `LandingPage.tsx`).
* `src/styles`: Contains global CSS files, resets, and font definitions.

### Styling

Styling is handled via **CSS Modules**. Each component is co-located with its own `.module.css` file. This approach locally scopes class names, preventing style conflicts and making components self-contained and portable.

---

## Local Development Setup

Follow these steps to get the project running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18.x or later)
* [npm](https://www.npmjs.com/) (v9.x or later)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Environment Variables

The application requires an environment variable to know the URL of the backend API.

1.  **Create a `.env` file** in the root of the project.
2.  **Add the following variable** and point it to your local backend server's URL:
    ```
    VITE_API_URL=http://localhost:3001
    ```

### Running the Application

Start the local development server:
```bash
npm run dev