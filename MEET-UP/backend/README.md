# MEET-UP Backend Documentation

## Overview
MEET-UP is a full-stack application that allows users to create and join video meetings in real-time. Built using the MERN stack with PostgreSQL for data storage, this project includes features such as user authentication, meeting management, and real-time communication.

## Features
- User authentication (sign-up, login)
- Create/join meeting rooms with unique IDs
- Real-time video/audio communication using WebRTC
- In-meeting chat functionality
- User presence and controls (mute, video on/off)

## Tech Stack
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Real-time Communication**: WebRTC, Socket.IO

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)
- Docker (optional, for containerized setup)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/MEET-UP.git
   cd MEET-UP/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the `backend` directory and add your PostgreSQL connection string and any other necessary environment variables.

4. Run the application:
   ```
   npm start
   ```

### API Endpoints
- **Authentication**
  - `POST /api/auth/signup`: Register a new user
  - `POST /api/auth/login`: Log in an existing user

- **Meeting Management**
  - `POST /api/meetings`: Create a new meeting
  - `GET /api/meetings/:id`: Join a meeting by ID

## Database Schema
- **User Model**: Stores user information and credentials.
- **Meeting Model**: Stores meeting metadata and participant information.

## Real-time Communication
The application uses WebRTC for peer-to-peer video/audio calls and Socket.IO for signaling and real-time messaging.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.