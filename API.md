# Supa Guru API Documentation

The Supa Guru API allows bots to register as Gurus and users to discover them.

## Base URL
```
https://api.supa.guru
```

## Authentication
All endpoints require an API key for authentication. Include it in the `Authorization` header:

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### 1. Register a Guru
**Endpoint**: `POST /register`

**Description**: Register a new bot as a Guru.

**Request Body**:
```json
{
  "name": "string",           // Required: Name of the bot
  "description": "string",     // Required: Description of the bot
  "capabilities": ["string"],  // Required: List of skills
  "contact": "string",         // Required: Contact method (e.g., Telegram username)
  "tags": ["string"]           // Optional: Tags for discovery
}
```

**Response**:
```json
{
  "guruId": "string",
  "message": "Bot registered successfully!"
}
```

**Example**:
```bash
curl -X POST https://api.supa.guru/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "name": "Supa Guru",
    "description": "A helpful bot",
    "capabilities": ["answering questions", "automation"],
    "contact": "@supa_guru_bot",
    "tags": ["AI", "fun"]
  }'
```

---

### 2. Get All Gurus
**Endpoint**: `GET /gurus`

**Description**: Retrieve a list of all registered Gurus.

**Response**:
```json
{
  "gurus": [
    {
      "guruId": "string",
      "name": "string",
      "description": "string",
      "capabilities": ["string"],
      "contact": "string",
      "tags": ["string"]
    }
  ]
}
```

**Example**:
```bash
curl -X GET https://api.supa.guru/gurus \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

### 3. Get a Specific Guru
**Endpoint**: `GET /gurus/{guruId}`

**Description**: Retrieve details of a specific Guru.

**Response**:
```json
{
  "guruId": "string",
  "name": "string",
  "description": "string",
  "capabilities": ["string"],
  "contact": "string",
  "tags": ["string"]
}
```

**Example**:
```bash
curl -X GET https://api.supa.guru/gurus/12345 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

### 4. Update a Guru
**Endpoint**: `PUT /gurus/{guruId}`

**Description**: Update details of a registered Guru.

**Request Body**:
```json
{
  "name": "string",           // Optional: Updated name
  "description": "string",     // Optional: Updated description
  "capabilities": ["string"],  // Optional: Updated skills
  "contact": "string",         // Optional: Updated contact method
  "tags": ["string"]           // Optional: Updated tags
}
```

**Response**:
```json
{
  "message": "Guru updated successfully!"
}
```

**Example**:
```bash
curl -X PUT https://api.supa.guru/gurus/12345 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "description": "An even more helpful bot",
    "capabilities": ["answering questions", "automation", "fun"]
  }'
```

---

### 5. Delete a Guru
**Endpoint**: `DELETE /gurus/{guruId}`

**Description**: Remove a Guru from the registry.

**Response**:
```json
{
  "message": "Guru removed successfully!"
}
```

**Example**:
```bash
curl -X DELETE https://api.supa.guru/gurus/12345 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## Error Responses
All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request body"
}
```

### 401 Unauthorized
```json
{
  "error": "Missing or invalid API key"
}
```

### 404 Not Found
```json
{
  "error": "Guru not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting
The API is rate-limited to 100 requests per hour per API key. Exceeding this limit will result in a `429 Too Many Requests` response.

---

## Support
If you encounter any issues or have questions, please open an issue on the [Supa Guru GitHub repository](https://github.com/supa-guru/supa-guru).
