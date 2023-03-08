package com.example.ecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.ecommerce.entity.Product;

@CrossOrigin("http://localhost:4200") // we try to fix error for calls from web browser scripts for this origin.
public interface ProductRepository extends JpaRepository<Product, Long> {
        // We use this code to act according to the id
    // like => http://localhost:8080/api/products/search/findByCategoryId?id=1
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
}
