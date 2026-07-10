# 💳 MyFatoorah Payment Gateway Integration

A robust, production-ready Node.js/Express.js backend integration with the MyFatoorah Payment Gateway. This project demonstrates a secure and complete payment cycle implementation, from link generation to payment verification.

## ✨ Features
* **Secure API Communication:** Implements Token-based authentication using MyFatoorah's Sandbox API.
* **Dynamic Payment Links:** Generates unique checkout URLs based on customer details and invoice amounts.
* **Payment Verification:** Dedicated endpoint to verify the transaction status (Paid/Failed) after the user returns from the payment gateway.
* **Error Handling & Validation:** Strict payload validation and comprehensive error handling for API rejections.
* **Environment Security:** Secures all sensitive keys and tokens using `.env`.

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **HTTP Client:** Axios
* **Configuration:** dotenv

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Saraabodeeb/myfatoorah-payment-integration.git](https://github.com/Saraabodeeb/myfatoorah-payment-integration.git)
   cd myfatoorah-payment-integration
