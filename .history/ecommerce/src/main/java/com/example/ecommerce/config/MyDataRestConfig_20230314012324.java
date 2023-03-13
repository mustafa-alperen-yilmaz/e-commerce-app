package com.example.ecommerce.config;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

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
        public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
                // Disable unsupported actions (making it read-only)
                HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

                // Disable HTTP methods for Product => PUT, POST and DELETE
                config.getExposureConfiguration().forDomainType(Product.class)
                        .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                        .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
                // Disable HTTP methods for ProductCategory => PUT, POST and DELETE
                config.getExposureConfiguration().forDomainType(ProductCategory.class)
                        .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                        .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        List<Class<?>> entityClasses = new ArrayList<>();
        for (EntityType<?> tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }
        Class<?>[] classes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(classes);
    }
}

