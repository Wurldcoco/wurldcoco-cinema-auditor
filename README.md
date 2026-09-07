Wurldcoco AI: Agentic IP & Cultural Rights Auditor
Project Overview
Wurldcoco AI is an advanced agentic intelligence system engineered specifically for the Agentic Cinema Hackathon. Its core mission is to safeguard indigenous cultural heritage, traditional folklore, and intellectual property rights within the film and media production pipeline. By automating compliance evaluations for screenplays, creative treatments, and production logs, the platform identifies potential copyright overreach, sacred knowledge violations, and cultural misappropriation before production begins.
System Architecture & Tech Stack
 * Backend Framework: Built with FastAPI to deliver high-performance asynchronous execution, complete with interactive OpenAPI 3.1 documentation hosted at /docs.
 * Core Reasoning Engine: Powered by google-genai (Gemini 2.5 Flash), providing deep narrative analysis, semantic cross-referencing of folklore motifs, and multi-tier compliance risk calculations.
 * TLS-Bypassing Registry Scraper: Utilizes curl_cffi to emulate browser TLS signatures (JA3/JA4) and HTTP/2 framing, enabling reliable queries against protected global archives (such as WIPO Traditional Cultural Expressions and UNESCO Intangible Cultural Heritage registries) without triggering anti-bot blocks.
 * Schema Validation: Enforces rigorous type safety and data structuring via Pydantic data models (ScreenplayAuditRequest and AuditReportResponse) to guarantee error-free payload handling across all production phases.
Local Setup & Execution Guide
 * Clone the Repository:
   git clone https://github.com/Wurldcoco/wurldcoco-cinema-auditor.git
cd wurldcoco-cinema-auditor

 * Install Dependencies:
   Ensure Python is installed, then install required packages:
   pip install -r requirements.txt

 * Configure Environment Variables:
   Create a .env file in the root directory and add your API credentials:
   GEMINI_API_KEY=your_actual_api_key_here

 * Launch the Development Server:
   Start the application locally using Uvicorn:
   uvicorn server:app --reload --port 8000

 * Explore API Documentation:
   Open your browser and navigate to http://localhost:8000/docs to test endpoints, inspect schemas, and run live audit payloads through the interactive Swagger interface.
   
