package com.example.customerapi.controller;

import com.example.customerapi.dto.CustomerDTO;
import com.example.customerapi.service.CustomerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * HTTP layer for customer endpoints.
 * Delegates all business logic to CustomerService — no domain logic lives here.
 */
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private static final Logger log = LoggerFactory.getLogger(CustomerController.class);

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    /** GET /api/customers — returns all customers as a JSON array. */
    @GetMapping
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        log.info("GET /api/customers");
        return ResponseEntity.ok(service.getAllCustomers());
    }

    /** GET /api/customers/{id} — returns a single customer or 404. */
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable Long id) {
        log.info("GET /api/customers/{}", id);
        return service.getCustomerById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
