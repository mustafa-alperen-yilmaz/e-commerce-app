package com.example.ecommerce.service;

import org.springframework.stereotype.Service;

import com.example.ecommerce.dao.CustomerRepository;
import com.example.ecommerce.dto.Purchase;
import com.example.ecommerce.dto.PurchaseResponse;
import com.example.ecommerce.entity.Order;

import jakarta.transaction.Transactional;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        //retrieve the order info from dto
        Order order = purchase.getOrder();
        //generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        return null;
    }
    private String generateOrderTrackingNumber(){
        return null;
    
    }
}
