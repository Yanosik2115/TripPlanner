package com.trippplanner.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public void registerClient(ClientRegistrationRequest request) {
        Client client = Client.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .username(request.username())
                .build();

        clientRepository.save(client);
    }

    public boolean clientExistsByUsername(String username) {
        return clientRepository.existsByUsername(username);
    }

    public boolean clientExistsByEmail(String email) {
        return clientRepository.existsByEmail(email);
    }
}
