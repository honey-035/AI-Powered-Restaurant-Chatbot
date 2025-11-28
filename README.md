# AI-Powered-Restaurant-Chatbot
The AI-Powered Restaurant Chatbot offers instant support via a modern UI. It lets users view the menu, check prices, and book tables/orders. AI processes queries, retrieving real-time data from Google Sheets (used as a live database for zero-deployment updates). This intelligent system automates support, cutting costs and staff workload.

# 🍽️ Restaurant AI Chatbot (Frontend + n8n Backend + Google Sheets Database)

A modern restaurant chatbot built using a clean HTML UI, JavaScript frontend, and a no-code backend powered by n8n + Google Sheets.
The AI-Powered Restaurant Chatbot offers instant support via a modern UI. It lets users view the menu, check prices, and book tables/orders. AI processes queries, retrieving real-time data from Google Sheets (used as a live database for zero-deployment updates). This intelligent system automates support, cutting costs and staff workload.

## ⭐ Features
### 🧠 Smart Chatbot (No-Code Backend)

> Backend fully built in n8n
> Handles message processing and sending smart replies
> Communicates with frontend through a simple API endpoint

### 📋 Google Sheets as Database

> Stores menu items
> Stores table bookings
> Stores customer messages / chat logs
> Easy to update without coding

### 🎨 Clean & Modern UI

> Gradient theme
> Floating chat button
> Smooth message bubbles
> Fully responsive design

### ⚡ Lightweight Frontend

> Only index.html + ui.js
> No frameworks required
> Works on any browser and device

### 🗂️ Project Structure
project/
│
├── index.html     # Chatbot UI
└── ui.js          # API calls + frontend chat logic


No backend files inside project — backend runs on n8n.

## 🚀 How It Works
### 1️⃣ Frontend UI (index.html)

User opens the chat window
Types any message
UI captures input and shows message bubble

### 2️⃣ Frontend Logic (ui.js)

Takes user input
Sends message to n8n webhook URL using fetch()
Waits for bot response
Displays response in chat window

### 3️⃣ Backend Workflow (n8n)

Webhook node receives the user message
Google Sheets fetches data (Menu, Booking Records, etc.)
Logic node processes message
Returns response to frontend instantly

### 4️⃣ Google Sheets Database

Used for:
Menu storage
Customer messages
Table booking records
Analytics

## 🧩 Technologies Used

Layer	Technology
Frontend	HTML, CSS (inside index.html), JavaScript (ui.js)
Backend	n8n Workflow Automation
Database	Google Sheets
API	n8n Webhook Node

## 🛠️ How to Use

### 1️⃣ Clone the Project
git clone https://github.com/honey-035/project.git
cd project

### 2️⃣ Set your n8n Webhook URL

Open ui.js and update:
const BACKEND_URL = "https://your-n8n-webhook-url";

### 3️⃣ Open the Frontend

Just double-click:
index.html

Chatbot is now working live.

### 📘 n8n Workflow (Backend Setup)

Your n8n backend typically includes:

##### 1. Webhook Node

Receives messages from frontend
URL copied into ui.js

#### 2. Function / AI Node

Understands user message
Reads menu or booking data
Generates correct reply

#### 3. Google Sheets Node

Reads menu sheet
Writes booking details
Logs chat history

#### 4. Webhook Response Node

Sends reply back to UI
This completes the full loop.

## 🍲 What This Chatbot Can Do

> Show menu items (Starters, Main Course, Desserts)
> Book table (name, time, number of people)
> Suggest dishes
> Answer general restaurant questions
> Store customer chats in Google Sheets
> All without coding the backend

## ❤️ Support

If you like this project, please ⭐️ the repository.
For help, issues, or improvements — feel free to open an issue.
