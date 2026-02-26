The Slate – Restaurant Web & Mobile App

Overview

The Slate is a web and mobile app for restaurant menu management and ordering.

Frontend: Next.js (React)
Backend: Node.js + Express + MongoDB
Mobile: Flutter

+ Features

* User login/register
* Menu listing and details
* Add to cart & checkout simulation
* Profile management
* Responsive design

+ Setup

* Backend

  + Install dependencies:

    cd backend
    npm install

  + Create .env file:

    PORT=5005
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

  + Run server:

    npm run dev
    Frontend
* Install dependencies:

  cd frontend
  npm install

* Run development:

  npm run dev

* Production build:

  npm run build
  npm run start

+ * Mobile
  cd mobile
  flutter pub get
  flutter run


*** Notes

Checkout is simulated; payment not implemented
Images served from backend /uploads
Use .env.example for placeholders