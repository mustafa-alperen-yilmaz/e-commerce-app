package com.example.ecommerce.entity;

import java.math.BigDecimal;
import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="product") // Database table name
@Data  // Lombok its automaticly generate getters and setters
public class Product {
    private Long id;
    private String sku;
    private String name;
    private String description;
    private String imageUrl;
    private boolean active;
    private int unitInStock;
    private BigDecimal unitPrice;
    private Date dateCreated;
    private Date dateUpdated;
}
