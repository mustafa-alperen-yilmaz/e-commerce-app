package com.example.ecommerce.service;

import org.springframework.stereotype.Service;

import com.example.ecommerce.dao.CustomerRepository;
import com.example.ecommerce.dto.Purchase;
import com.example.ecommerce.dto.PurchaseResponse;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;
    @Override
    public PurchaseResponse placeOrder(Purchase purchase) {
        throw new UnsupportedOperationException("Unimplemented method 'placeOrder'");
    }
}
