package com.example.ecommerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product_category")
// we dont use @Data because it has known bug (one to many or many to one ) so we can alternatively use lombok getter and setter
@Getter
@Setter
public class ProductCategory {
    
}
