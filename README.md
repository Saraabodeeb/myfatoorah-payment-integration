💳 MyFatoorah Payment Gateway Integration
A robust, production-ready Node.js/Express.js backend integration with the MyFatoorah Payment Gateway. This project demonstrates a secure and complete payment cycle implementation, from link generation to payment verification.
✨ Features
Secure API Communication: Implements Token-based authentication using MyFatoorah's Sandbox API.
Dynamic Payment Links: Generates unique checkout URLs based on customer details and invoice amounts.
Payment Verification: Dedicated endpoint to verify the transaction status (Paid/Failed) after the user returns from the payment gateway.
Error Handling & Validation: Strict payload validation and comprehensive error handling for API rejections.
Environment Security: Secures all sensitive keys and tokens using .env
🛠️ Tech Stack
Runtime: Node.js
Framework: Express.js
HTTP Client: Axios
Configuration: dotenv
🚀 How to Run Locally
Clone the repository:
git clone https://github.com/Saraabodeeb/myfatoorah-payment-integration.git
cd myfatoorah-payment-integration
Install dependencies:
npm install
Set up Environment Variables:
Create a .env file in the root directory and add your MyFatoorah API Key:
MYFATOORAH_API_KEY=your_sandbox_api_key_here
BASE_URL=http://localhost:3000
PORT=3000
Start the server:
node app.js
Navigate to http://localhost:3000 to test the UI.
📌 API Endpoints
POST /api/generate-link: Creates a payment invoice and returns the checkout URL.
POST /api/verify-payment: Validates the payment status using the returned paymentId.
