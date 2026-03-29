# Back-end Vinted

---

## Table of Contents
- About The Project  
- Built With  
- Getting Started  
- Installation  
- Usage  
- Roadmap  
- Disclaimer  
- Contact  

---

## About The Project

This project is a backend API inspired by the Vinted platform, developed as part of Le Reacteur bootcamp.

The goal is to replicate the core features of a second-hand marketplace:

- User authentication  
- Product listing management  
- Search and filtering system  
- Image upload  
- Secure API structure  

This project helped me understand how to design a complete backend for an e-commerce application and how it interacts with a frontend.

---

## Built With

- Node.js  
- Express  
- MongoDB / Mongoose  
- Cloudinary (image hosting)  
- Stripe (payments)  
- Axios  
- dotenv  

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
npm install npm@latest -g
```

### Installation

Clone the repository:
git clone https://github.com/Eva-caruana/Projet-back-end-Vinted.git
cd Projet-back-end-Vinted

start the server:
```bash
npm start
```

---

##Usage

### Authentication

- POST /user/signup → create a new account  
- POST /user/login → login and get a token  

### Offers

- GET / → get all offers  
- GET /offer/:id → get a specific offer  
- POST /offer/publish → create a new offer  


### Filters

Available filters:
title
priceMin
priceMax

Example:

```bash
/offers?title=shirt&priceMin=10&priceMax=50
```

## Image Upload

Images are uploaded via Cloudinary and stored using their `secure_url`.

## Payment

- Stripe integration  
- Allows payment simulation

## Roadmap
Add pagination
Add favorites
Add messaging system
Seller rating system
Mobile application
Disclaimer

## Disclaimer 
This project is an educational replica of the Vinted platform.
It is not affiliated with Vinted and has no commercial purpose.

## Contact

Eva Caruana

GitHub: https://github.com/Eva-caruana

Project: https://github.com/Eva-caruana/Projet-back-end-Vinted.git
