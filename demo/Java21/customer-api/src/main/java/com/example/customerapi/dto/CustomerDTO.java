package com.example.customerapi.dto;

/**
 * Data Transfer Object for Customer responses.
 * Intentionally omits internal fields and combines firstName + lastName
 * into fullName to decouple the API contract from the domain model.
 */
public class CustomerDTO {

    private Long id;
    private String fullName;
    private String email;

    public CustomerDTO(Long id, String fullName, String email) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
    }

    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
}
