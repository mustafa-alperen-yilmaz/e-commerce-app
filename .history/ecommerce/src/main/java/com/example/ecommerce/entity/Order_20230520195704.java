package com.example.ecommerce.entity;

import java.math.BigDecimal;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name="orders")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="order_tracking_number")
    private String orderTrackingNumber;
    @Column(name="total_quantity")
    private int totalQuantity;
    @Column(name="total_price")
    private BigDecimal totalPrice;
    @Column(name="id")
    private String status;
    @Column(name="id")
    private Date dateCreated;
    @Column(name="id")
    private Date lastUpdated;
}
