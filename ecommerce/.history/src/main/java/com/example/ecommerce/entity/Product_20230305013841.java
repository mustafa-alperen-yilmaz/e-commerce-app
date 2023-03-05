package com.example.ecommerce.entity;

import java.math.BigDecimal;
import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="product") // Database table name
@Data  // Lombok its automaticly generate getters and setters
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "sku")
    private String sku;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "imageUrl")
    private String imageUrl;
    @Column(name = "active")
    private boolean active;
    @Column(name = "unitInStock")
    private int unitInStock;
    @Column(name = "unitPrice")
    private BigDecimal unitPrice;
    @Column(name = "dateCreated")
    private Date dateCreated;
    @Column(name = "dateUpdated")
    private Date dateUpdated;
}
