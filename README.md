# MyFatoorah Payment Gateway Integration

A Node.js/Express.js backend integration with the MyFatoorah Payment Gateway, covering the full payment cycle from link generation to verification.

## Features

- Token-based authentication with MyFatoorah's Sandbox API
- Dynamic payment link generation based on customer and invoice details
- Payment verification endpoint to check transaction status (Paid/Failed)
- Input validation and error handling for API rejections
- Environment-based configuration for sensitive keys via `.env`

## Tech Stack

- Runtime: Node.js
- Framework: Express.js
- HTTP Client: Axios
- Configuration: dotenv

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Saraabodeeb/myfatoorah-payment-integration.git
cd myfatoorah-payment-integration
```

### Install dependencies

```bash
npm install
```

### Set up environment variables

Create a `.env` file in the root directory:

```
MYFATOORAH_API_KEY=your_sandbox_api_key_here
BASE_URL=http://localhost:3000
PORT=3000
```

### Start the server

```bash
node app.js
```

Then open http://localhost:3000 to test the UI.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/generate-link` | Creates a payment invoice and returns the checkout URL |
| POST | `/api/verify-payment` | Validates the payment status using the returned `paymentId` |
