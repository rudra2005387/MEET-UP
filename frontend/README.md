# MEET-UP Project

MEET-UP is a full-stack application that allows users to create and join video meetings in real-time. Built using the MERN stack and PostgreSQL, this project showcases user authentication, real-time communication, and meeting management features.

## Features

- **User Authentication**: Users can sign up and log in to their accounts.
- **Meeting Rooms**: Create and join meeting rooms with unique IDs.
- **Real-Time Video/Audio Communication**: Utilize WebRTC for peer-to-peer video and audio calls.
- **In-Meeting Chat**: Chat functionality within the meeting room.
- **User Presence and Controls**: Mute/unmute and toggle video on/off during meetings.
- **Backend Management**: Manage users, rooms, and signaling for WebRTC using Node.js and Express.
- **Database Storage**: Store user information and meeting metadata/history in PostgreSQL.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Real-Time Communication**: WebRTC, Socket.IO
- **Containerization**: Docker

## Project Structure

```
MEET-UP
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── app.js
│   ├── package.json
│   ├── .env
│   └── README.md
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── README.md
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Docker (optional)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd MEET-UP
   ```

2. Set up the backend:
   - Navigate to the `backend` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file and configure your database connection.

3. Set up the frontend:
   - Navigate to the `frontend` directory.
   - Install dependencies:
     ```
     npm install
     ```

4. Run the application:
   - For backend:
     ```
     npm start
     ```
   - For frontend:
     ```
     npm start
     ```

### Usage

- Access the application in your browser at `http://localhost:3000`.
- Use the authentication features to sign up or log in.
- Create or join meeting rooms to start video calls.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.