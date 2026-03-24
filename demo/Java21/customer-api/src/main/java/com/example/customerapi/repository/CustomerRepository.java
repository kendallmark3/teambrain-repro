package com.example.customerapi.repository;

import com.example.customerapi.model.Customer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * In-memory customer repository.
 * No database required for this demo — preloaded with seed data to keep
 * the focus on architectural layering rather than persistence concerns.
 */
@Repository
public class CustomerRepository {

    private static final Logger log = LoggerFactory.getLogger(CustomerRepository.class);

    private final List<Customer> customers = List.of(
        new Customer(1L, "Alice",   "Martin",  "alice.martin@example.com"),
        new Customer(2L, "Bob",     "Chen",    "bob.chen@example.com"),
        new Customer(3L, "Clara",   "Okonkwo", "clara.okonkwo@example.com"),
        new Customer(4L, "David",   "Patel",   "david.patel@example.com"),
        new Customer(5L, "Eleanor", "Vasquez", "eleanor.vasquez@example.com")
    );

    /** Returns all customers in the store. */
    public List<Customer> findAll() {
        log.info("Repository: returning {} customers", customers.size());
        return customers;
    }

    /** Returns a customer by ID, or empty if not found. */
    public Optional<Customer> findById(Long id) {
        log.info("Repository: looking up customer id={}", id);
        return customers.stream().filter(c -> c.getId().equals(id)).findFirst();
    }
}
