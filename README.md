# Student Dashboard

Welcome to the Student Dashboard project! This project is a comprehensive platform designed to enhance the learning experience for students. It features a responsive UI, mobile-friendly design, and a robust backend powered by Django and JWT authentication. Additionally, it incorporates machine learning models for lecture summary generation and face attendance.

## Features

### Responsive UI
- **Mobile-Friendly Design**: The UI is fully responsive and optimized for mobile devices. It includes swipe functionality and other mobile-friendly interactions.
- **Modern Layout**: The layout is designed to be intuitive and user-friendly, ensuring a seamless experience across different devices.

### Frontend
- **React Components**: The frontend is built using React, with components like `Sidebar`, `Header`, `Footer`, and various modals for different functionalities.
- **Rich Text Editor**: Integrated with `MyQuillComponent` for a rich text editing experience.
- **Charts and Analytics**: Visualize data with components like `BlogChart` and `DummyChartsComponent`.

### Backend
- **Django REST Framework**: The backend is powered by Django REST Framework, providing robust and scalable APIs.
- **JWT Authentication**: Secure authentication using JSON Web Tokens (JWT).
- **Classroom Management**: Manage classrooms, lectures, and resources efficiently.

### Machine Learning
- **Lecture Summary Generation**: Utilize ML models to generate summaries of lectures.
- **Face Attendance**: Implement face recognition for attendance tracking.
- **Optimization**: Continuous optimization of ML models for better performance and accuracy.

## Installation

### Prerequisites
- Node.js
- Python 3.x
- Django
- npm or yarn

### Frontend Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/student-dashboard.git
    cd student-dashboard
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

### Backend Setup
1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Run migrations:
    ```sh
    python manage.py migrate
    ```

5. Start the Django server:
    ```sh
    python manage.py runserver
    ```

## Usage

### Running the Application
- Ensure both the frontend and backend servers are running.
- Open your browser and navigate to `http://localhost:3000` for the frontend.
- The backend API will be available at `http://localhost:8000`.

### Authentication
- Register and log in using the provided endpoints.
- JWT tokens will be used for securing API requests.

## Contributing
We welcome contributions! 



## Contact
For any inquiries or issues, please contact us at piyushraivds45@gmail.com.

---

Thank you for checking out the Student Dashboard project! We hope you find it useful and engaging.
