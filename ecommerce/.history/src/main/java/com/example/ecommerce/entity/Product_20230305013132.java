package com.example.ecommerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="product") // Database table name
@Data  // Lombok its automaticly generate getters and setters
public class Product {
    
}
