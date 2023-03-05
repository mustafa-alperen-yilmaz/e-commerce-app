package com.example.ecommerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product_category")
// we dont use @Data because it has known bug so we can alternatively use lombok getter and setter
@Getter
@Setter
public class ProductCategory {
    
}
