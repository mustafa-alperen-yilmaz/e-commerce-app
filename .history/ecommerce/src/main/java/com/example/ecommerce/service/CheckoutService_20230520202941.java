package com.example.ecommerce.dao;

import com.example.ecommerce.dto.Purchase;
import com.example.ecommerce.dto.PurchaseResponse;

public interface CheckoutService{
    PurchaseResponse placeOrder(Purchase purchase);
    
}
