package com.trippplanner.client;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClientRepository extends MongoRepository<Client, String> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String username);
}
