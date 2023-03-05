package com.example.ecommerce.confige;


import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.example.ecommerce.entity.Product;

public class FileRestConfige implements RepositoryRestConfigurer {
    
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        HttpMethod[] theUnsportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
        // Disable to unsported actions (it makes read only)
        config.getExposureConfiguration().forDomainType(Product.class)
        .withItemExposure((metadata , httpMethods)-> httpMethods.disable(theUnsportedActions))
        .withCollectionExposure((metadata, httpMethods)-> httpMethods.disable(theUnsportedActions));
    }
}
