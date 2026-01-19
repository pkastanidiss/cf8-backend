# Student Notes Platform - Backend API

Αυτό είναι το Backend μέρος της εφαρμογής ανταλλαγής σημειώσεων. Πρόκειται για ένα RESTful API χτισμένο με Node.js που διαχειρίζεται την αποθήκευση των σημειώσεων, την αυθεντικοποίηση των χρηστών και την επικοινωνία με τη βάση δεδομένων.

---

## Τεχνολογίες (Tech Stack)

* **Runtime Environment:** [Node.js](https://nodejs.org/)
* **Web Framework:** [Express.js](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/) (μέσω Mongoose ODM)
* **Security:** * [JSON Web Tokens (JWT)](https://jwt.io/) για ασφαλή πρόσβαση.
    * [Bcrypt](https://www.npmjs.com/package/bcrypt) για κρυπτογράφηση κωδικών πρόσβασης.
* **Middleware:** [CORS](https://www.npmjs.com/package/cors) για σύνδεση με το Angular Frontend.

---

## Εγκατάσταση και Εκκίνηση (Setup)

Ακολουθήστε αυτά τα βήματα για να τρέξετε τον server τοπικά:

1. **Εγκατάσταση των απαραίτητων πακέτων:**
   ```bash
   npm install