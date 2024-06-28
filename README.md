Job Portal Application

Click to this link to visit website: https://job-hunter-1-6hv9.onrender.com/

Overview
This project is a Job Portal Application that allows recruiters to manage job postings and applicants to apply for jobs. It implements an MVC architecture using Express.js and provides dynamic server-side rendering with EJS. The application ensures modularity, session management, and efficient handling of user data and job management operations.

Features

MVC architecture with Express.js
Dynamic HTML generation using EJS
Modular code with ES6 modules
User session management with Express sessions
In-memory data structures for user and job management
Login and registration system for recruiters
Job seekers can view and apply for jobs
Recruiters can manage job postings
Viewing all applicants for a job with their resume files
Email confirmation system for job applications
Middleware for authentication, file uploads, and email sending

Technologies Used

Node.js
Express.js
EJS
ES6 Modules
Express Sessions
Nodemailer
Multer

Detailed Implementation Steps:

Set up an Express.js application and its related configurations.
Install necessary project dependencies based on the functionalities required.
Configure EJS as the templating engine and create views for job seekers and recruiters.
Create a User model with functions for user management.
Create a User controller to handle user registration, login, and logout.
Create a Job model with functions for job management.
Create a Job controller to manage job postings and applicants.
Implement routes for user and job operations.
Implement session-based user authentication and management.
Set up middleware for file uploads using Multer, send confirmation emails using Nodemailer, and track user visits using cookies.
Document the application explaining functionalities, dependencies, and code organization for easy understanding of the codebase.












