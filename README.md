# ArkaNet

This is a Next.js application designed as an OpenVPN client interface with advanced routing features, built using ShadCN UI components and Genkit for potential AI features.

## Getting Started Locally

Follow these steps to set up and run the ArkaNet application on your local machine for testing and development.

**Prerequisites:**

*   **Node.js:** Ensure you have Node.js (version 18 or later recommended) and npm (or yarn) installed. You can download it from [nodejs.org](https://nodejs.org/).
*   **Git:** (Optional, if cloning from a repository) Ensure Git is installed.

**Setup Instructions:**

1.  **Get the Code:**
    *   If you have the project files, navigate to the project's root directory in your terminal.
    *   If cloning from a Git repository:
        ```bash
        git clone <repository_url>
        cd ArkaNet
        ```

2.  **Install Dependencies:**
    Open your terminal in the project's root directory and run the following command to install the necessary packages:
    ```bash
    npm install
    ```
    *(If you prefer using yarn, run `yarn install`)*

3.  **Environment Variables:**
    *   This project uses a `.env` file for environment variables (like API keys).
    *   Create a `.env` file in the root directory:
        ```bash
        touch .env
        ```
    *   Add any required environment variables to this file. For example, if you plan to use Google AI features with Genkit:
        ```env
        GOOGLE_GENAI_API_KEY=YOUR_GOOGLE_AI_API_KEY
        ```
        *(Replace `YOUR_GOOGLE_AI_API_KEY` with your actual key. If you are not using Genkit AI features yet, you can leave this empty for now.)*

4.  **Run the Development Server:**
    *   **Next.js App:** To start the main web application, run:
        ```bash
        npm run dev
        ```
        *(Or `yarn dev`)*
        This will typically start the server on `http://localhost:9002`. Open this URL in your web browser.

    *   **(Optional) Genkit Development Server:** If you are developing or testing Genkit flows, run the Genkit development server in a *separate terminal*:
        ```bash
        npm run genkit:watch
        ```
        This starts the Genkit development UI, usually accessible at `http://localhost:4000`.

**Testing the Application:**

*   Open `http://localhost:9002` (or the port specified in your terminal) in your browser.
*   Interact with the UI components:
    *   Toggle the VPN connection status.
    *   View and modify settings (routing mode, network options, credentials).
    *   Import an `.ovpn` profile (note: this is simulated in the current UI).
*   Check the browser's developer console and the terminal running `npm run dev` for any errors or logs.

**Building for Production:**

When you are ready to deploy:

1.  **Build the Application:**
    ```bash
    npm run build
    ```
2.  **Start the Production Server:**
    ```bash
    npm run start
    ```

## Project Structure Highlights

*   `src/app/`: Contains the Next.js App Router pages and layouts.
*   `src/components/`: Reusable React components, including ShadCN UI components.
*   `src/components/ui/`: Base ShadCN UI components.
*   `src/lib/`: Utility functions.
*   `src/hooks/`: Custom React hooks.
*   `src/ai/`: Contains Genkit AI-related code (flows, prompts).
*   `public/`: Static assets.
*   `styles/`: Global CSS files.
```