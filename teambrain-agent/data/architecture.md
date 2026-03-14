# Nautobot to Salesforce Integration

The Nautobot to Salesforce integration is implemented as a Spring Boot microservice.

The service receives webhook events from Nautobot when location data changes.

The microservice transforms the Nautobot data model into the Salesforce location schema.

Kafka is used as the transport layer to guarantee delivery and reliability.

A dead letter queue handles message failures.

Observability is implemented using structured logging and metrics.
