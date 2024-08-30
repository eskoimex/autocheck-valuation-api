# autocheck-valuation-api
Assessment

#Autochek Vehicle Valuation and Financing API
Overview
This project provides a backend API for Autochek’s vehicle valuation and financing services. It includes endpoints for vehicle data ingestion, valuation requests, loan applications, and status updates.

Technologies
NestJS: Framework for building server-side applications.
TypeORM: ORM for SQLite database management.
SQLite: In-memory database for development.
TypeScript: Language for building the application.

Installation
1. Clone the Repository

git clone https://github.com/your-username/autochek-valuation-api.git
cd autochek-valuation-api

2. Install Dependencies

npm install

3. Set Up Environment Variables
Create a .env file in the project root and add your RapidAPI key:

env
Copy code
RAPIDAPI_KEY=your-rapidapi-key
Replace your-rapidapi-key with your actual RapidAPI key.

4. Start the Application

npm run start
The API will be available at http://localhost:3000.

Usage
Vehicle Data Ingestion
Endpoint: POST /vehicles

Description: Add vehicle data.

Request Body:

json
Copy code
{
  "vin": "1HGCM82633A123456",
  "make": "Honda",
  "model": "Civic",
  "year": 2020,
  "mileage": 15000
}
Vehicle Valuation
Endpoint: GET /valuation/:vin
Description: Get vehicle valuation for the given VIN.
Loan Application
Endpoint: POST /loan-applications

Description: Submit a loan application.

Request Body:

json
Copy code
{
  "vehicleId": 1,
  "amount": 15000,
  "term": 36
}
Update Loan Status
Endpoint: PATCH /loan-applications/:id

Description: Update the status of a loan application.

Request Body:

json
Copy code
{
  "status": "APPROVED"
}

Running Tests
To run tests, use:

npm run test