# Mock Test Platform (Static Version)

## Features
- Subject-wise test selection (Analog Design, RF Engineering)
- One-time user registration with Name and Email
- Test submission with score calculation
- Score emailed to user using EmailJS
- Simple leaderboard on homepage

## Setup Instructions
1. Sign up at https://www.emailjs.com/
2. Create an email template with variables: `user_name`, `user_email`, `subject`, `score`
3. Replace `YOUR_USER_ID`, `YOUR_SERVICE_ID`, and `YOUR_TEMPLATE_ID` in `email.js` and `script.js`
4. Host the site using GitHub Pages or any static server
