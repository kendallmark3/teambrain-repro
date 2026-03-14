# API Spec: Salesforce Location Sync Endpoint

## Overview

The integration service transforms Nautobot location objects into Salesforce location records using the Salesforce REST API.

Base URL: `https://salesforce.internal/api/v2`
Authentication: OAuth 2.0 Client Credentials
Content-Type: `application/json`

---

## Nautobot Location Schema (Source)

```json
{
  "id": "uuid",
  "name": "string",
  "location_type": "site | region | building | floor",
  "parent": "uuid | null",
  "status": "active | planned | decommissioning",
  "latitude": "float | null",
  "longitude": "float | null",
  "tenant": "string | null",
  "last_updated": "ISO8601 timestamp"
}
```

---

## Salesforce Location Schema (Target)

```json
{
  "ExternalId": "string",
  "Name": "string",
  "LocationType": "Site | Region | Building | Floor",
  "ParentLocationId": "string | null",
  "IsActive": "boolean",
  "Latitude": "float | null",
  "Longitude": "float | null",
  "AccountName": "string | null"
}
```

---

## Field Mapping

| Nautobot Field   | Salesforce Field      | Transformation                              |
|------------------|-----------------------|---------------------------------------------|
| id               | ExternalId            | Prefix with `nautobot-`                     |
| name             | Name                  | Direct                                      |
| location_type    | LocationType          | Capitalize first letter                     |
| parent           | ParentLocationId      | Prefix with `nautobot-` if present          |
| status           | IsActive              | `active` → true, all others → false         |
| latitude         | Latitude              | Direct                                      |
| longitude        | Longitude             | Direct                                      |
| tenant           | AccountName           | Direct                                      |

---

## Upsert Endpoint

**POST** `/sobjects/Location__c/ExternalId__c/{externalId}`

Used for both creates and updates. Idempotent by ExternalId.

### Request Example

```http
POST /api/v2/sobjects/Location__c/ExternalId__c/nautobot-abc123
Authorization: Bearer {token}
Content-Type: application/json

{
  "Name": "New York Data Center",
  "LocationType": "Site",
  "IsActive": true,
  "Latitude": 40.7128,
  "Longitude": -74.0060
}
```

### Response Codes

| Code | Meaning                          |
|------|----------------------------------|
| 200  | Record updated                   |
| 201  | Record created                   |
| 400  | Invalid payload — check mapping  |
| 401  | Token expired — rotate and retry |
| 429  | Rate limit — back off and retry  |
| 500  | Salesforce internal error — DLQ  |

---

## Rate Limits

- 100,000 API calls per 24-hour window
- Concurrent request limit: 25
- If 429 is returned, wait 60 seconds before retrying
