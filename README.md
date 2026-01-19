# Student Notes Platform - Backend API

Αυτό είναι το Backend μέρος της εφαρμογής **Student Notes Platform**. Πρόκειται για ένα RESTful API χτισμένο με **Node.js** και **Express**, το οποίο διαχειρίζεται την αυθεντικοποίηση χρηστών, τη διαχείριση ρόλων και την αποθήκευση σημειώσεων, με χρήση **MongoDB** και **Mongoose**.

## Τεχνολογίες (Tech Stack)

- **Runtime Environment:** [Node.js](https://nodejs.org/)  
- **Web Framework:** [Express.js](https://expressjs.com/)  
- **Language:** Typescript  
- **Database:** [MongoDB](https://www.mongodb.com/) μέσω Mongoose ODM  
- **Authentication & Security:** JWT Bearer Tokens, bcrypt για κρυπτογράφηση κωδικών  
- **API Documentation:** Swagger / OpenAPI 3.0 με swagger-jsdoc, swagger-ui-express και mongoose-to-swagger  
- **Middleware:** CORS, Custom validation & authentication middlewares  
- **Testing:** Jest και Supertest  

## API Documentation (Swagger)

Το Backend API παρέχει πλήρη τεκμηρίωση μέσω Swagger (OpenAPI 3.0). 
Η τεκμηρίωση παράγεται αυτόματα από JSDoc `@openapi` σχόλια στα route αρχεία και από τα Mongoose models μέσω του `mongoose-to-swagger`. 

Με τον server σε λειτουργία, το Swagger UI είναι διαθέσιμο στο:

http://localhost:4000/api/docs


Το API χρησιμοποιεί Bearer JWT authentication. 
Για να καλέσετε protected endpoints μέσω Swagger:

1. Κάντε login στο `POST /auth/login`.
2. Αντιγράψτε το `accessToken`.
3. Πατήστε **Authorize** στο Swagger UI.
4. Εισάγετε `Bearer <accessToken>`.

Μετά από αυτό, έχετε πρόσβαση σε όλα τα protected endpoints.

## Εγκατάσταση και Εκκίνηση (Setup)

1. Κλωνοποίηση του repository  
   ```bash
   git clone <repo-url>
   cd cf8-backend

2. Εγκατάσταση εξαρτήσεων  
    npm install

3. Ρύθμιση environment variables
Δημιουργήστε αρχείο .env με τις εξής ρυθμίσεις:

4. Εκκίνηση server (development)
    npm run dev

5. Εκκίνηση server (development)
    npm run build
    npm start



