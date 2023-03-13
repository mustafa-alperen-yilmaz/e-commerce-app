package com.example.ecommerce.config;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.ProductCategory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;
    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }
    @Override
    public void configureRespositoryRestConfiguration(RepositoryRestConfiguration config) {
        // Disable to unsported actions (it makes read only)
        HttpMethod[] theUnsportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
        // Disable HTTP methods for Product => put post and delete
        config.getExposureConfiguration().forDomainType(Product.class)
        .withItemExposure((metadata , httpMethods)-> httpMethods.disable(theUnsportedActions))
        .withCollectionExposure((metadata, httpMethods)-> httpMethods.disable(theUnsportedActions));

         // Disable HTTP methods for ProductCategory => put post and delete
         config.getExposureConfiguration().forDomainType(ProductCategory.class)
         .withItemExposure((metadata , httpMethods)-> httpMethods.disable(theUnsportedActions))
         .withCollectionExposure((metadata, httpMethods)-> httpMethods.disable(theUnsportedActions));

        exposeIds(config);
    }
    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        List<Class> entityClasses = new ArrayList<>();
        for(EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }
        Class[] classes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(classes);
    }
}
