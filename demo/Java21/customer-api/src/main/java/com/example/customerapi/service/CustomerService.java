package com.example.customerapi.service;

import com.example.customerapi.dto.CustomerDTO;
import com.example.customerapi.model.Customer;
import com.example.customerapi.repository.CustomerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Business logic layer for customer operations.
 * Responsible for DTO mapping and orchestrating repository calls —
 * the controller should never touch raw entities.
 */
@Service
public class CustomerService {

    private static final Logger log = LoggerFactory.getLogger(CustomerService.class);

    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    /** Returns all customers mapped to DTOs. */
    public List<CustomerDTO> getAllCustomers() {
        log.info("Service: fetching all customers");
        return repository.findAll().stream()
            .map(this::toDTO)
            .toList();
    }

    /** Returns a single customer DTO by ID, or empty if not found. */
    public Optional<CustomerDTO> getCustomerById(Long id) {
        log.info("Service: fetching customer id={}", id);
        return repository.findById(id).map(this::toDTO);
    }

    /** Maps a Customer entity to a CustomerDTO, combining name fields. */
    private CustomerDTO toDTO(Customer customer) {
        String fullName = customer.getFirstName() + " " + customer.getLastName();
        return new CustomerDTO(customer.getId(), fullName, customer.getEmail());
    }
}
