# Intent: Provisioning Service Provider API

## Objective
Create a new directory named:

    service-provider-provisioning

Generate a production-style REST API using Node.js, Express, MongoDB, and Kafka.

---

## Functional Requirements

### 1. API Endpoint

POST /api/provision

Request Body:
{
  "customerId": "string",
  "serviceType": "string",
  "configuration": {}
}

Behavior:
- Validate request
- Create a provisioningId (UUID)
- Persist document in MongoDB
- Publish event to Kafka topic "provisioning-requests"
- Return JSON response

Response:
{
  "provisioningId": "...",
  "status": "RECEIVED"
}

---

### 2. MongoDB

Use:
- Mongoose
- Separate config file
- Environment variable for connection string

Provisioning schema:
- provisioningId
- customerId
- serviceType
- configuration
- status
- createdAt

---

### 3. Kafka

Use:
- kafkajs
- Producer only
- Topic: provisioning-requests

Event Payload:
{
  provisioningId,
  customerId,
  serviceType,
  timestamp
}

---

### 4. Project Structure

service-provider-provisioning/
  src/
    app.ts
    server.ts
    routes/
    controllers/
    models/
    services/
    config/
  package.json
  tsconfig.json
  .env.example

Use TypeScript.

---

### 5. Add:

- Dockerfile
- docker-compose.yml (Mongo + Kafka + Zookeeper)
- README.md with startup instructions

---

## Non-Functional Requirements

- Clean architecture layering
- Async/await
- Error handling middleware
- Production-ready logging