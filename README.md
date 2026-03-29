#Back-end-Vinted


Table of Contents :
About The Project
Built With
Getting Started
Prerequisites
Installation
Usage
Roadmap
Contact


#About The Project
This project is a backend API inspired by the Vinted platform, developed as part of Le Reacteur bootcamp.

The goal is to replicate the core features of a second-hand marketplace:

user authentication
product listing management
search and filtering system
image upload
secure API structure

This project helped me understand how to design a complete backend for an e-commerce application and how it interacts with a frontend.

#Built With
Node.js
Express
MongoDB / Mongoose
Cloudinary (image hosting)
Stripe (payments)
Axios
dotenv


#Getting Started
Prerequisites

Make sure you have the following installed:

npm install npm@latest -g

#Installation
Clone the repository:
git clone https://github.com/Eva-caruana/Projet-back-end-Vinted.git


#Install dependencies:
npm install
Create a .env file at the root:
MONGODB_URI=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_key
Start the server:
npm start

#Usage
Authentication
POST /user/signup → create a new account
POST /user/login → login and get a token

#Offers
GET /offers → get all offers
GET /offer/:id → get a specific offer
POST /offer/publish → create a new offer
PUT /offer/update/:id → update an offer
DELETE /offer/delete/:id → delete an offer
🔎 Filters
/offers?title=shirt&priceMin=10&priceMax=50

#Available filters:
title
priceMin
priceMax
sort
Protected Routes
Authorization: Bearer YOUR_TOKEN

#Image Upload
Images are uploaded via Cloudinary and stored using their secure_url.

#Payment
POST /payment
Stripe integration
Allows payment simulation

#Roadmap
Add pagination
Add favorites 
Add messaging system

⚠️ Disclaimer
This project is an educational replica of the Vinted platform.
It is not affiliated with Vinted and has no commercial purpose.
 
#Contact

Eva CARUANA
GitHub: https://github.com/Eva-caruana
Project Link: https://github.com/Eva-caruana/Projet-back-end-Vinted.git
