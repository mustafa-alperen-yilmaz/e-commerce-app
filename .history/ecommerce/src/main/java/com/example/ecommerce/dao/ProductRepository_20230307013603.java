package com.example.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.ecommerce.entity.Product;

@CrossOrigin("http://localhost:4200") // we try to fix error for calls from web browser scripts for this origin.
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
