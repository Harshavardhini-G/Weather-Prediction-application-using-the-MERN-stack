# 🌤️ Weather MERN App

A full-stack weather application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The app allows users to search for a city's weather, view details like temperature, humidity, and wind speed, and save this data to a MongoDB database.

---

## 🚀 Features

- Real-time weather search using a public API (e.g., OpenWeatherMap)
- Displays weather details:
  - Temperature
  - Humidity
  - Wind speed
  - Weather description
- Saves searched weather data to MongoDB
- 🌙 Dark Mode Toggle
- Responsive and clean UI with React
- Backend API built using Express and Node.js

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Local)
- **API:** OpenWeatherMap

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weather-mern-app.git
cd weather-mern-app
````

### 2. Start MongoDB

Ensure MongoDB is installed and running locally:

```bash
mongod
```

### 3. Backend Setup

```bash
cd server
npm install
node server.js
```

### 4. Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 🌐 API Endpoints

| Method | Endpoint            | Description                         |
| ------ | ------------------- | ----------------------------------- |
| POST   | `/api/save-weather` | Save weather data to DB             |
| GET    | `/api/get-weather`  | *(Optional)* Retrieve saved weather |

---

## 📸 Screenshots

| Home Page                     | Dark Mode                         | Search Result                     |
| ----------------------------- | --------------------------------- | --------------------------------- |
| ![Home](https://i.postimg.cc/j5Q3mLw4/Screenshot-2025-05-21-230040.png) | ![Dark](https://i.postimg.cc/qgftKMwW/Screenshot-2025-05-21-230052.png) | ![Search](https://i.postimg.cc/P57qvqqy/Screenshot-2025-05-21-230123.png) |

| MongoDB Collection                    | MongoDB Document                      |
| ------------------------------------- | ------------------------------------- |
| ![MongoDB1](https://i.postimg.cc/zvQQS4Hs/Screenshot-2025-05-21-230231.png) | ![MongoDB2](https://i.postimg.cc/3NGq1njW/Screenshot-2025-05-21-230238.png) |

 
---

## 📄 License

MIT License


 
