# Intelligent Workflow Automation System

This project is a lightweight, local demonstration of an Intelligent Workflow Automation platform. It showcases a modern architecture for ingesting data (like new leads), analyzing them with logic/AI, and orchestrating automated actions based on the generated insights.

## Core Components

- **Workflow Orchestration Engine**: Handles the routing of data and acts differently based on changing variables.
- **AI Decision Engine**: Evaluates incoming records, derives a dynamic score based on the lead's profile, and explicitly decides on a subsequent workflow action (e.g., `INSTANT_CONTACT`, `NURTURE`, etc.).
- **Mock Integration Sub-systems**: Simulates realistic outward-bound operations such as sending Emails, SMS text messages, and syncing to a CRM.
- **Unified Dashboard UI**: A clean, single-page frontend that clearly surfaces the AI's internal decision logic, execution logs, and provides a lead generation form.

## Getting Started

### Prerequisites
Make sure you have Node.js installed.

### Setup & Run
1. Ensure you have Python installed, then set up a virtual environment and install the dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
2. Start the backend Flask server:
   ```bash
   python app.py
   ```
3. Visit the dashboard:
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

## Project Structure
- `app.py` - The main Python Flask backend handling the API routes, artificial intelligence scoring logic, and workflow transitions.
- `requirements.txt` - Python project dependencies.
- `server.js` - (Legacy) The original Node.js backend implementation.
- `public/index.html` - The main Dashboard application.
- `public/presentation.html` - A web-based presentation format of the conceptual system.
- `generate-ppt.js` - Script logic for regenerating or exporting the presentation outputs.

## Usage
Simply enter a new lead into the **Simulate New Lead** form. 
Watch the **🤖 AI Decisions** panel to see how the system interprets the lead, scores it out of 100, and routes it. You can observe the subsequent actions performed by the mock integrations live within the **System Execution Logs** panel.
