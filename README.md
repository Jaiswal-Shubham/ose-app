# Open Source Economy - Full-Stack Application

This repository is a monorepo containing the complete full-stack application for the Open Source Economy project. It includes a modern React frontend and a robust Node.js/Express backend API.

---

## Project Structure & Documentation

The project is divided into two main packages, each with its own detailed documentation, setup, and development instructions.

* ###  Frontend (`/frontend`)
    A modern, type-safe web application built with **React, TypeScript, and Vite**.
    
    ➡️ **[View Frontend README](./frontend/README.md)**

* ### Backend (`/api`)
    A scalable REST API built with **Node.js, Express, TypeScript, and PostgreSQL**.
    
    ➡️ **[View Backend README](./api/README.md)**

---

## Deployment

This monorepo is configured for seamless deployment to **Vercel**.

### Prerequisites

* You must have the [Vercel CLI](https://vercel.com/docs/cli) installed and be logged in (`vercel login`).
* Ensure all required environment variables (like `POSTGRES_URL`) are set in your Vercel project's settings.

### Deployment Commands

To deploy the entire application to production, run the following commands from the **root directory** of this project:

1.  **Build the project locally:**
    ```bash
    vercel build
    ```

2.  **Deploy the build to production:**
    ```bash
    vercel --prod
    ```
