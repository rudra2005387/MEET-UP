# MEET-UP Frontend Documentation

## Overview
MEET-UP is a full-stack application that allows users to create and join video meetings in real-time. Built using the MERN stack (MongoDB, Express, React, Node.js) and PostgreSQL, it provides a seamless experience for video/audio communication, chat functionality, and user management.

## Features
- User authentication (sign-up and login)
- Create and join meeting rooms with unique IDs
- Real-time video/audio communication using WebRTC
- In-meeting chat functionality
- User presence and controls (mute, video on/off)

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)
- PostgreSQL database

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/MEET-UP.git
   ```
2. Navigate to the frontend directory:
   ```
   cd MEET-UP/frontend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to access the application.

### Folder Structure
- `public/`: Contains the main HTML file and static assets.
- `src/`: Contains all React components, context, and utility functions.
  - `components/`: Contains reusable components for authentication, meetings, and home page.
  - `context/`: Contains context providers for managing global state.
  - `utils/`: Contains utility functions for API calls.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.